import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../services/api';
import { BsFillEyeFill, BsTrashFill } from "react-icons/bs";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FaEdit } from "react-icons/fa";
import { DataGrid } from '@mui/x-data-grid';


//this is for the header of the table
const columns = [
    { field: '_id', headerName: 'ID', width: 82 },
    { field: 'fullname', headerName: 'Full Name', width: 130 },
    { field: 'contact_num', headerName: 'Contact No.', width: 130 },
    { field: 'location', headerName: 'Location', width: 100 },
    { field: 'reg_date', headerName: 'Register Date', width: 130 },
    { field: 'email', headerName: 'Email Address', width: 130 },
    {
        field: '',
        headerName: 'Action',
        width: 130,
        renderCell: (params) => {
            return (
                <>
                    <a href={`/contact/${params.row._id}`} className="m-2" style={{ color: '#2196f3' }}><BsFillEyeFill /></a>
                    <a href={`/edit/${params.row._id}`} className="m-2" style={{ color: 'green' }}> < FaEdit /></a>
                    <a href={`/delete/${params.row._id}`} className="m-2" style={{ color: 'red' }}>< BsTrashFill /></a>
                </>
            );
        },
    }
];

class ShowContacts extends Component {

    constructor(props) {
        super(props);

        this.header = columns;
        this.state = {
            contacts: [],
        };
    }

    //fetching all data from the database
    componentDidMount() {
        api
            .get('/contacts/')
            .then(res => {
                
                this.setState({
                    contacts: res.data
                });
                console.log(this.state.contacts);
            })
            .catch(err => {
                console.log(err + 'Error from Contact List');
            })
    };

    render() {
        return (
            <div className="container">
                <Card sx={{ minWidth: 300 }}>
                    <CardContent>
                        <div className="row-justify-content-center">
                            <div className="d-flex justify-content-between">
                                <div className="p-2"><a href="/create" className="btn btn-sm btn-primary" style={{ fontSize: 10 }}>&nbsp;Create New Contact</a></div>
                                <div className="p-2 lead">Contact List</div>
                                <div className="p-2"><a href="/view" className="btn btn-sm btn-primary" style={{ fontSize: 10 }}> &nbsp;View Reports</a></div>
                            </div>
                            <div className="col mt-2">
                                <div style={{ height: 390, width: '100%' }}>
                                    <DataGrid
                                        rows={this.state.contacts}
                                        columns={this.header}
                                        getRowId={(row) => row._id}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default ShowContacts;
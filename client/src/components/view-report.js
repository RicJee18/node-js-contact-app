import React, { Component } from 'react';
import api from './../services/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


class ViewReports extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            totals: [],
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            jan: [],
            feb: [],
            mar: [],
            apr: [],
            may: [],
            jun: [],
            jul: [],
            aug: [],
            sep: [],
            oct: [],
            nov: [],
            dec: []
        };

    }

    async componentDidMount() {
        
        await api
            .get('/contacts/')
            .then(res => {

                this.setState({
                    contacts: res.data
                });

            })
            .catch(err => {
                console.log(err + 'Error from Contact List');
            })

        await api
            .get('/contacts/oct')
            .then(res => {
                console.log(res);
                this.setState({
                    oct: res.data
                });

            })
            .catch(err => {
                console.log(err + 'Error from Contact List');
            })

        await api
            .get('/contacts/sep')
            .then(res => {
                console.log(res);
                this.setState({
                    sep: res.data
                });

            })
            .catch(err => {
                console.log(err + 'Error from Contact List');
            })

    }

    countRegistered(location) {
        const countContact = this.state.contacts.filter(contact => contact.location === location);
        return countContact.length;
    }


    render() {

        return (

            < div className='container' >
                <Card sx={{ minWidth: 500 }}>
                    <CardContent>
                        <p className="lead text-center">
                            Reports
                        </p>
                        <hr />
                        <div className="row">
                            <div className="col-6">
                                <label className="">Numbered Registered Users in Manila : &nbsp; <b>{this.countRegistered('Manila')}</b></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label for="">Numbered Registered Users in Cebu : &nbsp; <b>{this.countRegistered('Cebu')}</b> </label>
                            </div>
                        </div>
                        <div class="mt-2">Resources Registered: </div>
                        <div class="row m-2">
                            <table class="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>

                                        {this.state.months.map(month => {
                                            return <th scope="col">{month}</th>
                                        })}

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="col">2021</th>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>{this.state.sep.length}</td>
                                        <td>{this.state.oct.length}</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <a href="/" className="btn btn-sm btn-primary"> Back </a>
                    </CardContent>
                </Card>
            </div >
        )
    }
}


export default ViewReports;
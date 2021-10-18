const { required, date } = require('joi');
const mongoose = require('mongoose');
const validator = require('validator')
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    fullname: {

        type: String,
        trim:true,

    },
    email:{

        type: String,
        trim:true,
        
    },
    contact_num:{

        type: Number,
        trim:true,

    },
    location:{

        type: String,
        trim:true,

    },
    reg_date:{

        type:String,
        trim:true
        
    }
}, {
    
    timestamps: true

});

const Contact = mongoose.model('contacts', contactSchema);

module.exports  = Contact;
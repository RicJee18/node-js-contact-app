
const Contact = require('../models/contact')
const { validationResult } = require('express-validator')



exports.addContact = async (req, res, next) => {
    try {

        const errors = validationResult(req)

        let errorsArray = {};

        if (!errors.isEmpty()) {

            errors.array({ onlyFirstError: true }).forEach((error) => {

                if (!errorsArray[error.param]) {
                    errorsArray[error.param] = []
                }
                errorsArray[error.param] = [...errorsArray[error.param], error.msg];
            });

            return res.status(400).json(errorsArray);
        }

        const { fullname, email, contact_num, location, reg_date } = req.body;

        const newContact = new Contact({
            fullname,
            email,
            contact_num,
            location,
            reg_date,
        });

        await newContact
            .save()
            .then(() => res.json("New record added!"))
            .catch((err) => res.status(400).json("Error: " + err));

    } catch (err) {
        return next(err)
    }

}

exports.viewContact = async (req, res) => {
    try {
        const contact = await Contact.find()
        res.send(contact)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.viewSpecificContact = async (req, res) => {

    const _id = req.params.id;

    try {
        const contact = await Contact.findById(_id)
        if (!contact) {
            return res.status(404).send()
        }

        res.send(contact)
      

    } catch (err) {
        res.status(500).send(err)
    }

}

exports.updateContact = async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ["fullname", "email", "contact_num", "location", "reg_date"]
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid Updates.*" })
    }

    try {

        const errors = validationResult(req)

        let errorsArray = {};

        if (!errors.isEmpty()) {

            errors.array({ onlyFirstError: true }).forEach((error) => {

                if (!errorsArray[error.param]) {
                    errorsArray[error.param] = []
                }
                errorsArray[error.param] = [...errorsArray[error.param], error.msg];
            });

            return res.status(400).json(errorsArray);
        }

        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!contact) {
            return res.status(404).send()
        }

        res.send(contact)

    } catch (error) {
        res.status(500).send(error)
    }
}

exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id)
        if (!contact) {
            return res.status(404).send()
        }
        res.send(contact)
    } catch (error) {
        res.status(500).send(error)
    }
}

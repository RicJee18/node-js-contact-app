const express = require('express')
const router = new express.Router()
const contactController = require('../controllers/contactController')
const validationController = require('../controllers/validationController')
const Contact = require('../models/contact')


//2021
const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
const jan = /^2021-01/;
const feb = /^2021-02/;
const mar = /^2021-03/;
const apr = /^2021-04/;
const may = /^2021-05/;
const jun = /^2021-06/;
const jul = /^2021-07/;
const aug = /^2021-08/;
const sep = /^2021-09/;
const oct = /^2021-10/;
const nov = /^2021-11/;
const dec = /^2021-12/;
const listofMonths = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]

for (let ctr = 0; ctr < listofMonths.length; ctr++) {
   
    router.get(`/${months[ctr]}`, (req, res) => {
       
        Contact.find({
            reg_date: {
                $regex: listofMonths[ctr],
                $options: 'm'
            }
        })
            .then(contact => res.json(contact))
            .catch(err => res.status(400).json('Error : ' + err));

    })

}

router.post('/add', validationController.validate('createContact'), contactController.addContact)
router.get('/', contactController.viewContact)
router.get('/:id', contactController.viewSpecificContact)
router.patch('/edit/:id', validationController.validate('updateContact'), contactController.updateContact)
router.delete('/delete/:id', contactController.deleteContact)



module.exports = router;

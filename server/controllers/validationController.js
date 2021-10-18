const { check } = require('express-validator')
const moment = require('moment')

exports.validate = (method) => {
    switch (method) {
        case 'createContact': {
            return [

                check('fullname')
                    .not().notEmpty().withMessage('Full Name Field cannot be blank.*')
                    .isLength({ max: 30 }).withMessage('Full Name field accept up to 30 in size only.*')
                    .matches(/^[A-Za-z\s.,]+$/).withMessage('Full Name field accept characters values only.*'),

                check('email')
                    .trim().not().notEmpty().withMessage('Email Address Field cannot be blank.*')
                    .isEmail().normalizeEmail().withMessage('Email Address field should have email domain.*')
                    .isLength({ max: 45 }).withMessage('Email Address field accept up to 45 in size only.*'),

                check('contact_num')
                    .trim().not().notEmpty().withMessage('Contact Number Field cannot be blank.*')
                    .isLength({ max: 11 }).withMessage('Contact Number accept up to 11 in size only.*')
                    .isLength({min: 11}).withMessage('Contact Number does not accept below 11 .*')
                    .isInt().withMessage('Contact Number field accept numeric values only.*'),

                check('location')
                    .trim().not().notEmpty().withMessage('Location Field cannot be blank.*'),

                check('reg_date')
                    .trim().notEmpty().withMessage('Registered Date Field cannot be blank.*')
                    .custom(val => {

                        const today = new Date();
                        const currentDate =
                            today.getFullYear() + "-"
                            + (today.getMonth() > 8 ? today.getMonth() + 1 : "0"
                                + (today.getMonth() + 1)) + "-"
                            + (today.getDate() > 9 ? today.getDate() : "0" + today.getDate());

                        

                        if (currentDate !== val) {
                            throw new Error(' Registered Date field must be today*.')
                        }
                
                        return val;
                    })
            ]
        }

        case 'updateContact': {
            return [

                check('email')
                    .trim().not().notEmpty().withMessage('Email Address Field cannot be blank.*')
                    .isEmail().normalizeEmail().withMessage('Email Address field should have email domain.*')
                    .isLength({ max: 45 }).withMessage('Email Address field accept up to 45 in size only.*'),

                check('contact_num')
                    .trim().not().notEmpty().withMessage('Contact Number Field cannot be blank.*')
                    .isInt().withMessage('Contact Number field accept numeric values only.*')
                    .isLength({ max: 11 }).withMessage('Contact Number accept up to 11 in size only.*'),

                check('location')
                    .trim().not().notEmpty().withMessage('Location Field cannot be blank.*'),

            ]
        }
    }
}
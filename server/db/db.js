//local database
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/contact-app', {
    useNewURLParser : true,
    useUnifiedTopology:true

},(error) => {
    if (error) {
        return console.log("Unable to connect to database!")
    }else{
        return console.log('Connected Successfully to the database!')
    }
})

//online database
// mongoose.connect('mongodb+srv://useradmin:admin123@crud-app.gmmxe.mongodb.net/contact-db?retryWrites=true&w=majority', {
//     useNewURLParser : true,
//     useUnifiedTopology:true

// },(error) => {
//     if (error) {
//         return console.log("Unable to connect to database!")
//     }else{
//         return console.log('Connected Successfully to the database!')
//     }
// })

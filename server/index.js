const express = require('express')
require('./db/db')
const cors = require('cors')
const ContactRouter = require('./routes/routes')

const app = express()
const port = process.env.PORT || 5000

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/contacts', ContactRouter)

app.listen(port, () => {
    console.log('Server is running at port ' + port);
})


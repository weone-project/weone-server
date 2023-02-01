// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }


const express = require('express')
const app = express()
const port = process.env.PORT || 4002
const routes = require('./routers')
const errorHandler = require('./middlewares/error-handler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log("---");
    console.log(`Example app listening on port`, port)
})
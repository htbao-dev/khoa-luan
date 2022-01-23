const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const route = require('./src/app/routes')
const socket = require('./src/app/socket')
const db = require('./src/config/db.config')
const req = require('express/lib/request')
const app = express()
const PORT = process.env.PORT || 3483

db.connect()
require('dotenv').config()


app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const server = app.listen(PORT)
route(app)
socket(server)

console.log('RESTful API server started on: ' + PORT)

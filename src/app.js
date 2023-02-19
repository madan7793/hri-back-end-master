const express = require('express')
const cors = require('cors')
const SubdomainsProvider = require('./Routes/Subdomains/subdomains.router')
const UsersRoute = require('./Routes/Users/users.router')
const ShopsRouter = require('./Routes/Shops/shops.router')
const CustomerRouter = require('./Routes/Custemor/customer.router')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/user', UsersRoute)
app.use('/shop', ShopsRouter)
app.use('/subdomains', SubdomainsProvider)
app.use('/customer', CustomerRouter)

module.exports = app
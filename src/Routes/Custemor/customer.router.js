const express = require('express')
const {httpCreateCustomer, httpGetCustomer, httpAddOrder, httpIsUserAlreadyExisted, httpSendOtp, httpVerifyOtp, httpSendMail, httpLoginWithPassword, httpSendOtpForLogin, httpUpdateAddress, httpMakeDefaultAddress, httpChangeProfilePic, httpUpdateCustomer, httpEditAddress, httpDeleteAddress} = require('./custemor.controlles')

const CustomerRouter = express.Router()

CustomerRouter.post('/isnew', httpIsUserAlreadyExisted)

CustomerRouter.post('/sendotp', httpSendOtp)

CustomerRouter.post('/sendloginotp', httpSendOtpForLogin)

CustomerRouter.post('/verifyotp', httpVerifyOtp)

CustomerRouter.post('/loginwithpass', httpLoginWithPassword)

CustomerRouter.post('/createcustomer', httpCreateCustomer)

CustomerRouter.post('/getcustomer', httpGetCustomer)

CustomerRouter.post('/updatecustomer', httpUpdateCustomer)

CustomerRouter.post('/updateaddress', httpUpdateAddress)

CustomerRouter.post('/editaddress', httpEditAddress)

CustomerRouter.post('/deleteaddress', httpDeleteAddress)

CustomerRouter.post('/makedefault', httpMakeDefaultAddress)

CustomerRouter.post('/changeprofilepic', httpChangeProfilePic)

CustomerRouter.post('/addorder', httpAddOrder)

CustomerRouter.post('/contactus', httpSendMail)

module.exports = CustomerRouter
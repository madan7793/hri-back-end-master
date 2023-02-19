const express = require('express')
const {httpGetUser, httpCreateUser, httpUpdateUser,httpshowOrders, httpSendOtp, httpVerifyOtp, httpUpdateUserStatus, httpGetVersionControll, httpChangeOrderStatus, httpUpdateValidTill, httpGetApplicationData, httpUpdateNotificationSettings} = require('./users.controller')

const UsersRoute = express.Router()

UsersRoute.get('/version', httpGetVersionControll)

UsersRoute.get('/applicationdata', httpGetApplicationData)

UsersRoute.post('/sendotp', httpSendOtp)

UsersRoute.post('/verifyotp', httpVerifyOtp)

UsersRoute.post('/checkuser', httpCreateUser)

UsersRoute.post('/getuser', httpGetUser)

UsersRoute.post('/createuser', httpCreateUser)

UsersRoute.post('/updateuser', httpUpdateUser)

UsersRoute.post('/showorders',httpshowOrders)

UsersRoute.post('/userStatus', httpUpdateUserStatus)

UsersRoute.post('/changeorderstatus', httpChangeOrderStatus)

UsersRoute.post('/updatevalidtill', httpUpdateValidTill)

UsersRoute.post('/updatenotificationsettings', httpUpdateNotificationSettings)

module.exports = UsersRoute
const express = require('express')
const {httpCreateShop, httpUpdateShop, httpAddProduct, httpUpdateHeader, httpUpdateFooter, httpGetShop, httpUpdateProduct, httpAddCategorty, httpUpdateCategorty, httpGetProduct, httpUpdateTerms, httpUpdateWelcomeBanner, httpUpdateTeam, httpDeleteProduct, httpDeleteCategory, httpGetButtons, httpUpdateButtons, httpUpdatePayment, httpAddTeammate, httpUpdateValidTill, httpAddBill } = require('./shops.controller')

const ShopsRouter = express.Router()

ShopsRouter.post('/', httpGetShop)

ShopsRouter.post('/product', httpGetProduct)

ShopsRouter.post('/createshop', httpCreateShop)

ShopsRouter.post('/updateshop', httpUpdateShop)

ShopsRouter.post('/addcategory', httpAddCategorty)

ShopsRouter.post('/updatecategory', httpUpdateCategorty)

ShopsRouter.delete('/deletecategory', httpDeleteCategory)

ShopsRouter.post('/updatepayment', httpUpdatePayment)

ShopsRouter.post('/updateheader', httpUpdateHeader)

ShopsRouter.post('/updatebanner', httpUpdateWelcomeBanner)

ShopsRouter.post('/updateteam', httpUpdateTeam)

ShopsRouter.post('/addteammate', httpAddTeammate)

ShopsRouter.post('/getbuttons', httpGetButtons)

ShopsRouter.post('/updatebuttons', httpUpdateButtons)

ShopsRouter.post('/updatefooter', httpUpdateFooter)

ShopsRouter.post('/updateterms', httpUpdateTerms)

ShopsRouter.post('/addproduct', httpAddProduct)

ShopsRouter.post('/updateproduct', httpUpdateProduct)

ShopsRouter.delete('/deleteproduct', httpDeleteProduct)

ShopsRouter.post('/updatevalidity', httpUpdateValidTill)

ShopsRouter.post('/addbill', httpAddBill)

module.exports = ShopsRouter
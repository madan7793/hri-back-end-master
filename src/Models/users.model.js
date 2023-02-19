const User = require('./users.schema')
const Customer = require('./customer.schema')
const Shop = require('./shops.schema')

async function getUser (userId) {
    const userData = await User.findOne({userId: userId})

    if (userData !== null){
        return userData
    }else{
        return "User Not Existed"
    }
}

async function createUser (userData){
        await User.updateOne({userId: userData.userId}, userData, {upsert: true})    
}

async function updateUser (updatedUser){
    await User.updateOne({userId: updatedUser.userId}, updatedUser, {upsert: true})
}

async function updateShopIdInUser (shopData){
    const user = await User.findOne({userId: shopData.shopOwnerId})
    user.shopId = shopData.shopId
    user.shopName = shopData.shopName
    user.userStatus = "FIRSTPRODUCT"
    await User.updateOne({userId: user.userId}, user, {upsert: false})
}

async function placeOrder(orderData){
    const user = await User.findOne({shopId: orderData.orders[0].shopId})
    const orders = orderData.orders.map(eachOrder => {
        let variant = null
        if (eachOrder.hasVariants){
            const size = eachOrder.size
            const color = eachOrder.color
            variant = size + " " + color
        }
        return {
            orderId: eachOrder.orderId, 
            productId: eachOrder.productId, 
            productImage: eachOrder.productImage,
            productName: eachOrder.productName,
            variant: variant,
            productCount: eachOrder.productCount, 
            name: eachOrder.name, 
            email: orderData.email, 
            paymentMethod: eachOrder.paymentMethod, 
            address: eachOrder.address, 
            orderStatus: eachOrder.orderStatus,
            date: orderData.date
        }
    })
    user.orders.push(...orders)
    await User.updateOne({userId: user.userId}, user, {upsert: false})
}


async function showOrders(orderData){
    const user= await User.findOne({shopId:orderData.shopId})
    return(user.orders)
}

async function updateUserStatus(userData){
    const user = await User.findOne({userId: userData.userId})
    user.userStatus = userData.userStatus
    await User.updateOne({userId: user.userId}, user, {upsert: false})
}

async function ChangeOrderStatus(orderData){
    const customer = await Customer.findOne({email:orderData.email})
    const user = await User.findOne({shopId: orderData.shopId})
    user.orders = user.orders.map(order=>{
        if(order.orderId === orderData.orderId){
            order.orderStatus = orderData.orderStatus
            return order
        }else{
            return order
        }
    })    
    customer.orders = customer.orders.map(order => {
        if(order.orderId === orderData.orderId){
            order.orderStatus = orderData.orderStatus
            return order
        }else{
            return order
        }
    })
    await User.updateOne({shopId: orderData.shopId}, user, {upsert:false})
    await Customer.updateOne({email: orderData.email}, customer, {upsert: false})
}

async function updateValidTill (userData){
    const user = await User.findOne({userId: userData.userId})
    user.userType = userData.userType
    const shop = await Shop.findOne({shopId: user.shopId})
    shop.validTill = userData.validTill
    await User.updateOne({userId: user.userId}, user, {upsert: false})
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
}

async function updateNotificationSettings (notificationData){
    const user = await User.findOne({userId: notificationData.userId})
    user.notificationEnabled = notificationData.notificationEnabled
    user.notificationToken = notificationData.notificationToken
    await User.updateOne({userId: user.userId}, user)
}



module.exports = {getUser, createUser, updateUser, placeOrder, updateShopIdInUser,showOrders, updateUserStatus, ChangeOrderStatus, updateValidTill, updateNotificationSettings}
const Shop = require('./shops.schema')
const { updateShopIdInUser, updateUserStatus } = require('./users.model')

async function CreateShop(shopData){
    await Shop.updateOne({shopId: shopData.shopId}, shopData, {upsert: true})
    await updateShopIdInUser(shopData)
}

async function GetShop (shopid){
    const shop = await Shop.findOne({shopId: shopid})
    return shop
}

async function GetProduct (productData){
    const {products} = await Shop.findOne({shopId: productData.shopId})
    const product = products.filter(eachProduct => eachProduct.productId === productData.productId)
    return product
}

async function UpdateShop(shopData){
    await Shop.updateOne({shopId: shopData.shopId}, shopData, {upsert: true})
}

async function addCategory(categoryData){
    const shop = await Shop.findOne({shopId: categoryData.shopId})
    shop.categorys = [...shop.categorys, categoryData.category]
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
}

async function deleteCategory(categoryData){
    const shop = await Shop.findOne({shopId: categoryData.shopId})
    shop.categorys = shop.categorys.filter(eachCategory => eachCategory.categoryId !== categoryData.categoryId)
    shop.products = shop.products.filter(eachProduct = eachProduct.productCategory !== categoryData.categoryId)
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
}

async function updatePaymentMethod(paymentData){
    const shop = await Shop.findOne({shopId: paymentData.shopId})
    shop.QRCode = paymentData.QRCode
    shop.upiId = paymentData.upiId
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
    await updateUserStatus({userId: shop.shopOwnerId, userStatus: 'COMPLETED'})
}

async function updateCategory(categoryData){
    const shop = await Shop.findOne({shopId: categoryData.shopId})
    shop.categorys = shop.categorys.map(eachCtegory => {
        if (eachCtegory.categoryId === categoryData.category.categoryId){
            return categoryData.category
        }else{
            return eachCtegory
        }
    })
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
}

async function updateHeader(headerData){
    const shop = await Shop.findOne({shopId: headerData.shopId})
    shop.settings.header = {...shop.settings.header, ...headerData.header}
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
}

async function updateWelcomBanner(bannerData){
    const shop = await Shop.findOne({shopId: bannerData.shopId})
    shop.settings.welcomeBanner = {...bannerData.welcomeBanner}
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
}

async function updateTeam(teamData){
    const shop = await Shop.findOne({shopId: teamData.shopId})
    shop.settings.team = teamData.team
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
}

async function addTeamMember(teammateData){
    const shop = await Shop.findOne({shopId: teammateData.shopId})
    shop.settings.team = [...shop.settings.team, teammateData.teammate]
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
}

async function updateFooter(footerData){
    const shop = await Shop.findOne({shopId: footerData.shopId})
    shop.settings.footer = {...shop.settings.footer, ...footerData.footer}
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
}

async function updateTerms(termsData){
    const shop = await Shop.findOne({shopId: termsData.shopId})
    shop.settings.termsAndConditions = termsData.termsAndConditions
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
}


async function getButtons(shopId){
    const shop = await Shop.findOne({shopId: shopId})
    const buttons = shop.settings.buttons
    return buttons
}

async function updateButtons(buttonsData){
    const shop = await Shop.findOne({shopId: buttonsData.shopId})
    shop.settings.buttons = buttonsData.buttons
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
}

async function AddProduct(productData){
    const shop = await Shop.findOne({shopId: productData.shopId})
    shop.products.push(productData.product)
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: true})
}

async function updateProduct(productData){
    const shop = await Shop.findOne({shopId: productData.shopId})
    shop.products = shop.products.map(eachProduct => {
        if (eachProduct.productId === productData.productId){
            return ({...eachProduct, ...productData.product})
        }else{
            return eachProduct
        }
    })
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: true})
}

async function deleteProduct (productData){
    const shop =  await Shop.findOne({shopId: productData.shopId})
    shop.products = shop.products.filter(eachProduct => eachProduct.productId !== productData.productId)
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
}

async function updateValidTill (data){
    const shop =  await Shop.findOne({shopId: data.shopId})
    shop.validTill = data.validTill
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
}

async function decreseCount (orderData){
    const shop = await Shop.findOne({shopId: orderData.orders[0].shopId})
    const orderItemsIds = orderData.orders.map(eachOrder => eachOrder.productId)
    let availabul = true
    shop.products = shop.products.map(eachProduct => {
        if(orderItemsIds.includes(eachProduct.productId)){
            const [order] = orderData.orders.filter(each => each.productId === eachProduct.productId)
            let updatedCount = 0
            if (order.hasVariants){
                const size = order.size
                const color = order.color
                updatedCount = eachProduct.variants[size][color].stock - order.productCount
                eachProduct['variants'][size][color]['stock'] = updatedCount
            }else{
                updatedCount = eachProduct.productUnits - order.productCount
                eachProduct.productUnits = updatedCount
            }
            if (updatedCount >= 0){
                return eachProduct
            }else{
                availabul = false
            }
        }else{
            return eachProduct
        }
    })
    if (availabul){
        await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
        return true
    }else{
        return false
    }
}


async function addBill (billData){
    const shop = Shop.findOne({shopId: billData.shopId})
    if (shop.Bills !== undefined){
        shop.Bills = [...shop.Bills, billData.bill]
    }else{
        shop.Bills = [billData.bill]
    }
    
    await Shop.updateOne({shopId: shop.shopId}, shop, {upsert: false})
}

module.exports = {CreateShop, GetShop, GetProduct, UpdateShop, addCategory, updateCategory, deleteCategory, updatePaymentMethod, updateHeader, updateWelcomBanner, updateTeam, addTeamMember, getButtons, updateButtons, updateFooter, updateTerms, AddProduct, updateProduct, deleteProduct, updateValidTill, decreseCount, addBill}
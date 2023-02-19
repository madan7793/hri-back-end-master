const Customer = require('./customer.schema')
const { decreseCount } = require('./shops.model')
const {placeOrder} = require('./users.model')

async function GetCustomer (email){
    const customerData = await Customer.findOne({email: email})
    return customerData
}

async function CreateCustemor (customerData){
    const response = await Customer.updateOne({email: customerData.email}, customerData, {upsert: true})
    return response
}

async function UpdateCustomer (customerData){
    await Customer.updateOne({email: customerData.email}, customerData.updatedData, {upsert: false})
}

async function UpdateCustemorAddress (addressData){
    const customer = await Customer.findOne({email: addressData.email})
    let addressKeys = []
    if (customer.address !== undefined){
        addressKeys = Object.keys(customer.address)
    }
    if ((addressKeys !== []) && (addressData.makeDefault === 'true')){
        addressKeys.forEach(each => customer.address[each]['defaultAddress'] = false)
        customer.address[addressData.addressKey] = {addressType: addressData.addressType, defaultAddress: true, fullAddress: addressData.address}
    }else{
        customer.address[addressData.addressKey] = {addressType: addressData.addressType, defaultAddress: addressData.makeDefault, fullAddress: addressData.address}
    }
    await Customer.updateOne({email: customer.email}, customer, {upsert: false})
}

async function updateAddress (addressData) {
    const customer = await Customer.findOne({email: addressData.email})
    customer.address[addressData.address.addressKey] = addressData.address
    await Customer.updateOne({email: customer.email})
}

async function deleteAddress (addressData){
    const customer = await Customer.findOne({email: addressData.email})
    customer.address = delete customer.address[addressData.addressKey]
    await Customer.updateOne({email: customer.email}, customer)
}

async function makeDefaultAdders (addressData){
    const customer = await Customer.findOne({email: addressData.email})
    const addressKeys = Object.keys(customer.address)
    addressKeys.forEach(each => {
        if (each === addressData.addressKey){
            customer.address[each]['defaultAddress'] = true
        }else{
            customer.address[each]['defaultAddress'] = false
        }
    } )
    await Customer.updateOne({email: customer.email}, customer)
}

async function changeCustomerprofilePic (profileData){
    console.log(profileData.email)
    const customer = await Customer.findOne({email: profileData.email})
    console.log(customer)
    customer.profilePic = profileData.profilePic
    await Customer.updateOne({email: customer.email}, customer)
}

async function AddOrder (orderData){
    const response = await decreseCount(orderData)
    if (response){
        const customer = await Customer.findOne({email: orderData.email})
        customer.orders.push(...orderData.orders)
        await Customer.updateOne({email: customer.email}, customer, {upsert: false})
        await placeOrder(orderData)
        return true
        }else{
            return false
      }
    }


module.exports = {GetCustomer, CreateCustemor, updateAddress, UpdateCustomer, deleteAddress, UpdateCustemorAddress, makeDefaultAdders, changeCustomerprofilePic, AddOrder}
const {CreateCustemor, AddOrder, GetCustomer, UpdateCustemorAddress, makeDefaultAdders, changeCustomerprofilePic, UpdateCustomer, deleteAddress, updateAddress} = require('../../Models/customer.model')
const {SendMail}=require('./mailContact')
const {v4} = require('uuid')
const nm = require('nodemailer');

const savedOTPS = {}

var transporter = nm.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'hri.naina.me@gmail.com',
            pass: 'xpaaxeceyxqbrazt'
        }
    }
);

async function httpSendOtp (req, res){
    let {email} = req.body;
    const isUserExisted = await GetCustomer(email)
    if (isUserExisted === null){
        let digits = '0123456789';
        let limit = 6;
        let otp = ''
        for (i = 0; i < limit; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        
        }
        var options = {
            from: 'hri.naina.me@gmail.com',
            to: `${email}`,
            subject: "OTP || Welcome to HRI",
            html: `<p>Enter the otp:</p> <h1>${otp}</h1> <p>to verify your email address. <br/> Don't share this OTP with anyone.<br/>Don't reply to this eamil.</p>`
        
        };
        transporter.sendMail(
            options, function (error, info) {
                if (error) {
                    return res.status(500).send({'response': "couldn't send"})
                }
                else {
                    savedOTPS[email] = otp;
                    setTimeout(
                        () => {
                            delete savedOTPS.email
                        }, 120000
                    )
                    return res.status(200).send({'response': true})
                }
            }
        )
    }else{
        return res.status(200).json({"response": false})
    }
    
}

async function httpSendOtpForLogin (req, res){
    let {email} = req.body;
    const isUserExisted = await GetCustomer(email)
    if (isUserExisted !== null){
        let digits = '0123456789';
        let limit = 6;
        let otp = ''
        for (i = 0; i < limit; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        
        }
        var options = {
            from: 'hri.naina.me@gmail.com',
            to: `${email}`,
            subject: "OTP || Welcome to HRI",
            html: `<p>Enter the otp:</p> <h1>${otp}</h1> <p>to verify your email address. <br/> Don't share this OTP with anyone.<br/>Don't reply to this eamil.</p>`
        
        };
        transporter.sendMail(
            options, function (error, info) {
                if (error) {
                    return res.status(500).send({'response': "couldn't send"})
                }
                else {
                    savedOTPS[email] = otp;
                    setTimeout(
                        () => {
                            delete savedOTPS.email
                        }, 120000
                    )
                    return res.status(200).send({'response': true})
                }
            }
        )
    }else{
        return res.status(200).json({"response": false})
    }
    
}

async function httpVerifyOtp (req, res) {
    const userData = req.body
    let {email, otp} = userData;
    if (savedOTPS[email] == otp) {
        const customer = await GetCustomer(email)
        if (customer === null){
            await CreateCustemor(userData)
            const customerData = await GetCustomer(email)
            return res.status(201).json(customerData)
        }else{
            return res.status(200).json(customer)
        }
    }
    else {
        return res.status(500).send("Invalid OTP")
    }
}

async function httpLoginWithPassword (req, res){
    const {email, password} = req.body
    try{
        const customer = await GetCustomer(email)
        if (customer !== null){
            if (customer.passwordEnabled){
                if (customer.password === password){
                    return res.status(200).json(customer)
                }else{
                    return res.status(500).json('PASSWORD DOSE NOT MATCHE')
                }
            }else{
                return res.status(500).json('PASSWORD NOT ENABLED')
            }
        }else{
            return res.status(500).json('USER NOT FOUND')
        }
    }catch(e){
        return res.status(500).json('SOMETHING WAS WRONG')
    }
}


async function httpIsUserAlreadyExisted (req, res){
    const {email}  = req.body
    try{
        const customer = await GetCustomer(email)
        if (customer === null){
            return res.status(200).json({'response': true})
        }else{
            return res.status(200).json({"response": false})
        }
    }
    catch(e){
        return res.status(504).json({"response": "Some Thing Was Wrong"})
    }
}

async function httpCreateCustomer(req, res){
    const customerData = req.body
    try{
        await CreateCustemor(customerData)
        return res.status(201).json({"response": "User Created"})
    }catch(e){
        return res.status(504).json({"response": "Some Thing Was Wrong"})
    }
}

async function httpUpdateCustomer (req, res){
    const customerData = req.body
    try {
        await UpdateCustomer(customerData)
        res.status(201).json({"response": "Updated"})
    } catch (e) {
        res.status(500).json({"response": "Something was wrong"})
    }
}

async function httpDeleteAddress (req, res){
    const addressData = req.body
    try {
        await deleteAddress(addressData)
        res.status(201).json({"response": "Deleted"})
    } catch (e) {
        res.status(500).json({"response": "Something was wrong"})
    }
}

async function httpEditAddress (req, res){
    const addressData = req.body
    try {
        await updateAddress(addressData)
        res.status(201).json({"response": "address updated"})
    } catch (e) {
        res.status(500).json({"response": "Something was worong"})
    }
}

async function httpGetCustomer(req, res){
    const {email}  = req.body
    try{
        const customer = await GetCustomer(email)
        if (customer !== null){
            return res.status(200).json(customer)
        }else{
            return res.status(401).json({"response": "user Not Found"})
        }
    }
    catch(e){
        return res.status(504).json({"response": "Some Thing Was Wrong"})
    }
}

async function httpUpdateAddress (req, res){
    const addressData = req.body
    const addressKey = v4()
    addressData['addressKey'] = addressKey
    try {
        await UpdateCustemorAddress(addressData)
        res.status(201).json('pass')
    } catch (error) {
        res.status(500).json('fail')
    }
}

async function httpMakeDefaultAddress(req, res){
    const addressData = req.body
    try {
        await makeDefaultAdders(addressData)
        res.status(200).json({"response": "Address Updated"})
    } catch (e) {
        res.status(500).json({'response': 'Something was wrong'})
    }
}

async function httpChangeProfilePic (req, res){
    const profileData = req.body
    try {
        await changeCustomerprofilePic(profileData)
        res.status(201).json({"response": "Profile Updated"})
    } catch (e) {
        res.status(500).json({"response": 'Something was wrong'})
    }
}

async function httpAddOrder(req, res){
    const orderData = req.body
    const orderId = v4()
    try{
        orderData.orders.forEach(eachOrder => eachOrder.orderId = orderId)
        const response = await AddOrder(orderData)
        return res.status(200).json({"response": response})
    }catch(e){
        return res.status(504).json({"response": "Some Thing Was Wrong"})
    }
}

async function httpSendMail(req,res)
{
    const message=req.body
    try{
        await SendMail(message)
        return res.status(200).json({"Response":"Message successfully Sent"})
    }
    catch(e)
    {
        return res.status(500).json(e)
    }
}

module.exports = {httpSendOtp, httpSendOtpForLogin, httpVerifyOtp, httpLoginWithPassword, httpUpdateCustomer, httpEditAddress, httpDeleteAddress, httpIsUserAlreadyExisted, httpCreateCustomer, httpGetCustomer, httpUpdateAddress, httpMakeDefaultAddress, httpChangeProfilePic, httpAddOrder, httpSendMail}

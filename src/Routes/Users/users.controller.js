const {getUser, createUser, updateUser, showOrders, updateUserStatus, ChangeOrderStatus, updateValidTill, updateNotificationSettings} = require('../../Models/users.model')
const nm = require('nodemailer');
const { GetVerstionController } = require('../../Models/version.model');
const { getApplicationData } = require('../../Models/application.model');

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
    let email = req.body.email;
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
                res.status(500).send("couldn't send")
            }
            else {
                savedOTPS[email] = otp;
                setTimeout(
                    () => {
                        delete savedOTPS.email
                    }, 120000
                )
                res.send("sent otp")
            }

        }
    )
}

async function httpVerifyOtp (req, res) {
    let otprecived = req.body.otp;
    let email = req.body.email;
    if (savedOTPS[email] == otprecived) {
        res.send("Verfied");
    }
    else {
        res.status(500).send("Invalid OTP")
    }
}

async function httpGetApplicationData (req, res){
    try {
        const response = await getApplicationData()
        res.status(200).json({"response": response})
    } catch (e) {
        res.status(500).json({"response": "SOMETHING WAS WRONG"})
    }
}

async function httpGetVersionControll (req, res){
    try {
        const response = await GetVerstionController()
        const {compatableVersions} = response
        res.status(200).json({compatableVersions})
    } catch (error) {
        res.status(500).json({"response": "Something was worng"})
    }
}

async function httpGetUser (req, res){
    const {userId} = req.body
    try{
        const response = await getUser(userId)
        return res.status(200).json({"response": response})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    }
}

async function httpCheckUser (req, res){
    const {userId} = req.body
    try{
        const response = await getUser(userId)
        if (response !== null){
            res.status(200).json({'response': true})
        }else{
            res.status(200).json({"response": false})
        }
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    }
}

async function httpCreateUser (req, res){
    const userData = req.body
    try{
        await createUser(userData)
        return res.status(201).json({'response': "User created successfully", "userId": userData.userId})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    }
    
}

async function httpUpdateUser (req, res){
    const updatedUser = req.body
    try{
        await updateUser(updatedUser)
        res.status(200).json({"response": "Updated Successfully"})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    }
}

async function httpshowOrders(req,res)
{
    const orderData=req.body
    try
    {
    resp= await showOrders(orderData)
    res.status(200).json({"orders":resp})
    }
    catch(e)
    {
        return res.status(400).json({"Response":"Something went wrong !!!"})
    }
}

async function httpUpdateUserStatus(req,res)
{
    const userData = req.body
    try{
        await updateUserStatus(userData)
        res.status(201).json("User Status Updated")
    }catch(e)
    {
        return res.status(400).json({"Response":"Something went wrong !!!"})
    }
}

async function httpChangeOrderStatus(req, res){
    const orderData = req.body
    try{
        await ChangeOrderStatus(orderData)
        return res.status(200).json({"response":"Order Status Updated!"})
    }
    catch(e)
    {
        return res.status(504).json({"response":"Internal Server Error"})
    }
}

async function httpUpdateValidTill (req, res){
    const userData = req.body
    try {
        await updateValidTill(userData)
        res.status(201).json({"response": "User Updated"})
    } catch (e) {
        res.status(500).json({"response": "Something was wrong"})
    }
}

async function httpUpdateNotificationSettings (req, res){
    const notificationData = req.body
    try {
        await updateNotificationSettings(notificationData)
        res.status(201).json({"response": "Updated"})
    } catch (e) {
        res.status(500).json({"response": "Something Was Wrong"})
    }
}

module.exports = {httpSendOtp, httpVerifyOtp, httpGetUser, httpGetVersionControll, httpGetApplicationData, httpCreateUser, httpCheckUser, httpUpdateUser,httpshowOrders, httpUpdateUserStatus, httpChangeOrderStatus, httpUpdateValidTill, httpUpdateNotificationSettings}


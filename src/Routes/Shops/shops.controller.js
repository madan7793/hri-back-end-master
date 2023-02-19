const {CreateShop, UpdateShop, AddProduct, addCategory, updateCategory, updateHeader, updateFooter, GetShop, updateProduct, GetProduct, updateWelcomBanner, updateTeam, updateTerms, deleteProduct, deleteCategory, getButtons, updateButtons, updatePaymentMethod, addTeamMember, updateValidTill, addBill} = require('../../Models/shops.model')
const {v4} = require('uuid')

async function httpCreateShop(req, res){
    const shopData = req.body
    try{
        await CreateShop(shopData)
        return res.status(200).json({"subdomain": shopData.shopId})
    }catch(e){
        return res.status(400).json({"response": "Something Was Wrong"})
    }
}

async function httpGetShop (req, res){
    const {shopId} = req.body
    try{
        const shop = await GetShop(shopId)
        return res.status(200).json({"response": shop})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    }
}

async function httpGetProduct (req, res){
    const productData = req.body
    try{
        const response = await GetProduct(productData)
        return res.status(200).json(response)
    }catch(e){
        return res.status(400).json({"response": "Something was Wrong"})
    }
}

async function httpUpdateShop(req, res){
    const shopData = req.body
    try{
        await UpdateShop(shopData)
        res.status(200).json({"response": "Shop Data Updated"})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    }
}

async function httpAddCategorty (req, res){
    const categoryData = req.body
    categoryData.category.categoryId = v4()
    
    try{
        await addCategory(categoryData)
        res.status(201).json({"response": "Category Added", "categoryId": categoryData.category.categoryId})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    }  
}

async function httpUpdateCategorty (req, res){
    const categoryData = req.body
    try{
        await updateCategory(categoryData)
        res.status(201).json({"response": "Category Updated"})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    }  
}

async function httpDeleteCategory(req, res){
    const categoryData = req.body
    try{
        await deleteCategory(categoryData)
        res.status(201).json({"response": "Category Deleted"})
    }catch(e){
        return res.status(400).json({"response": "Someting was Wrong"})
    }
}

async function httpUpdatePayment(req, res){
    const paymentData = req.body
    try{
        await updatePaymentMethod(paymentData)
        res.status(201).json({"response": "Payment Method Updated"})
    }catch(e){
        return res.status(400).json({"response": "Someting was Wrong"})
    }
}

async function httpUpdateHeader(req, res){
    const headerData = req.body
    try{
        await updateHeader(headerData)
        res.status(201).json({"response": "Header Updated"})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    }  
}

async function httpUpdateWelcomeBanner(req, res){
    const bannerData = req.body
    try{
        await updateWelcomBanner(bannerData)
        res.status(201).json({"response": "Banner Updated"})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    } 
}

async function httpUpdateTeam(req, res){
    const teamData = req.body
    try{
        await updateTeam(teamData)
        res.status(201).json({"response": "Team Updated"})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    } 
}

async function httpAddTeammate(req, res){
    const teammateData = req.body
    try{
        await addTeamMember(teammateData)
        res.status(201).json({"response": "Team Updated"})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    } 
}

async function httpGetButtons (req, res){
    const {shopId} = req.body
    try{
        const buttons = await getButtons(shopId)
        return res.status(200).json(buttons)
    }catch(e){
        return res.status(500).json('SOMETHING WAS WRONG')
    }
}

async function httpUpdateButtons (req, res){
    const buttonsData = req.body
    try{
        await updateButtons(buttonsData)
        return res.status(201).json('UPDATED SUCCESSFULLY')
    }catch(e){
        return res.status(500).json('SOMETHING WAS WRONG PLEASE TRY AGAIN')
    }
}

async function httpUpdateFooter (req, res){
    const footerData = req.body
    try{
        await updateFooter(footerData)
        res.status(201).json({"response": "Footer Updated"})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    }
}

async function httpUpdateTerms(req, res){
    const termsData = req.body
    try{
        await updateTerms(termsData)
        res.status(201).json({"response": "Terms Updated"})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    } 
}

async function httpAddProduct(req, res){
    const productData = req.body
    productData.product.productId = v4()
    try{
        await AddProduct(productData)
        res.status(200).json({"response": "Prodect added To Shop", "productId": productData.product.productId})
    }
    catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    }
}

async function httpUpdateProduct(req, res){
    const productData = req.body
    try{
        await updateProduct(productData)
        res.status(202).json({"response": "product Updated"})
    }catch(e){
        return res.status(400).json({"response": "Something Was Wrong"})
    }
}

async function httpDeleteProduct(req, res){
    const productData = req.body
    try{
        await deleteProduct(productData)
        res.status(201).json({"response": "product delete"})
    }catch(e){
        return res.status(400).json({"response": "Something Was Wrong"})
    }
}

async function httpUpdateValidTill(req, res){
    const data = req.body
    try{
        await updateValidTill(data)
        res.status(201).json({"response": "Validity Updated"})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    }  
}

async function httpAddBill (req, res){
    const billData = req.body
    try{
        await addBill(billData)
        res.status(201).json({"response": "updated"})
    }catch(e){
        res.status(500).json({"response": "Something was wrong"})
    }
}

module.exports = {httpCreateShop, httpGetShop, httpGetProduct, httpUpdateShop, httpAddCategorty, httpUpdateCategorty, httpDeleteCategory, httpUpdatePayment, httpUpdateHeader, httpUpdateWelcomeBanner, httpUpdateTeam, httpAddTeammate, httpGetButtons, httpUpdateButtons, httpUpdateFooter, httpUpdateTerms, httpAddProduct, httpUpdateProduct, httpDeleteProduct, httpUpdateValidTill, httpAddBill}
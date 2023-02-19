const {CreateSubdomain, GetAllSubdomains, ModifySubdomain, IsSubdomainExisted } = require('../../Models/subdomain.model')
const {v4} = require('uuid')

async function httpCreateSubdomain (req, res) {
    const subdomainData = req.body
    try{
        subdomainData.subdomainId = v4()
        await CreateSubdomain(subdomainData)
        return res.status(201).json({"response": subdomainData.subdomainId})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    }
}

async function httpCheckSubdomainAvailabulity (req, res){
    const {subdomain} = req.body
    try{
        const response = await IsSubdomainExisted(subdomain)
        if (response === null){
            res.status(200).json({'response': true})
        }else{
            res.status(200).json({'response': false})
        }
    }catch(e){
        res.status(400).json({'response': 'something was wrong'})
    }
    
}

async function httpUpdateSubdomain (req, res){
    const subdomainData = req.body
    try{
        await ModifySubdomain(subdomainData)
        return res.status(201).json({"response": "Subdomain updated"})
    }catch(e){
        return res.status(400).json({"response": "Some Thing Was Wrong"})
    }
}

async function httpGetAllSubdomains (req, res){
    try{
        const subdomains = await GetAllSubdomains()
        return res.status(200).json({"response" : subdomains})
    }catch(e){
        return res.status(400).json({"response": "Something was wrong"})
    }
}

module.exports = {httpCreateSubdomain, httpCheckSubdomainAvailabulity, httpUpdateSubdomain, httpGetAllSubdomains}
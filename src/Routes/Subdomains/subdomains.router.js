const express = require('express')

const {httpCreateSubdomain, httpGetAllSubdomains, httpUpdateSubdomain, httpCheckSubdomainAvailabulity} = require('./subdomains.controller')

const SubdomainsProvider = express.Router()

SubdomainsProvider.get('/', httpGetAllSubdomains)
SubdomainsProvider.post('/checksubdomain', httpCheckSubdomainAvailabulity)
SubdomainsProvider.post('/modifysubdomain', httpUpdateSubdomain)
SubdomainsProvider.post('/createsubdomain', httpCreateSubdomain)


module.exports = SubdomainsProvider
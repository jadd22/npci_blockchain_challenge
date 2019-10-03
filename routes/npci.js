const contract = require('truffle-contract'),
    truffle = require('../truffle-config'),
    sc = require('../build/contracts/NPCI.json'),
    status = require('http-status');
    common = require('../common/msg.js');
let Web3 = require('web3'),
    web3 = new Web3(new Web3.providers.HttpProvider(
      "http://" +
      truffle.networks.development.host +
      ":" +
      truffle.networks.development.port
    ));
const maxGas = truffle.networks.development.gas; 
const express = require('express');
const router = express.Router();
NPCI = contract(sc);
NPCI.setProvider(web3.currentProvider);
const defaultSender = {
    from : web3.eth.coinbase,
    gas : maxGas
};

async function setContractInstance() {
  console.log("Something!");
  Instance = await NPCI.deployed();
  return Instance;
}
setContractInstance();
const controller = require('../controller/blockchain');

router.get('/', async function(req,res){
    res.render('register');
})

router.get('/bankDetail', async function(req,res){
    data = {
        "Name": "Jaydeep",
        "walletBalance": "100"
    }
    res.render('bankDetail',data);
})


router.get('/transfer', async function(req,res){
    res.render('transfer');
})
router.get('/userDetail/:userAddress',controller.userDetail);

router.get('/addwithdraw', async function(req,res){
    res.render('addwithdraw');
})

router.post('/sendMoney', async function(req,res){
    const result = controller.transfer;
    const data = {
        "Info" : result.info,
        "tx" : result.data.tx
    }
    res.render(
        'transfer', 
        data
    )
})

router.post('/detailOfBank', async function(req,res){
    const data = req.params;
    let bankAddress = req.params.bankAddress;
    console.log(bankAddress)
    const result = await Instance.getBankDetail(bankAddress,defaultSender);
    const msg = "Bank details!";
    console.log("Result",result["0"]);
    const rest = {
        "Name" : result["0"],
        "ListOfUser" : result["1"],
        "Status" : result["2"]
    }
    //console.log(rest)
    //res.send(rest);
    res.render()
})


module.exports = router;

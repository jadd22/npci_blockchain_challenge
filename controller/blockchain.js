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

console.log("Web3 status", web3.isConnected());
console.log("chain test",common.response.Success);

const addBank = async(req,res) => {
    console.log("Adding bank!");
    try {
        console.log(req.body);
        let bankAddress = req.body.bankAddress;
        let name = req.body.name;
        const txHash = await Instance.addBank(bankAddress,name,defaultSender);
        console.log("TxHash",txHash);
        const msg = "Bank Registered Successfully into Blockchain"
        res.send(common.successResponse(status.OK,msg,txHash));
        return;
    } catch(error) {
        const msg = "Fail to Register Bank, It might already exist in Blockchain";
        res.send(common.failureResponse(status.INTERNAL_SERVER_ERROR,msg,error.message));
        return;
    }
    
}


const addUsers = async(req,res) => {
    let userAddress = req.body.userAddress,
        bankAddress = req.body.bankAddress,
        bankBal = req.body.bankBal,
        name = req.body.name;
    try {
        const txHash = await Instance.addUser(
            userAddress, bankAddress, bankBal,name,defaultSender
        );
        const msg = "User Added Successfully into Blockchain";
        res.send(common.successResponse(status.OK,msg,txHash));
        return;
    } catch (error) {
        const msg = "Fail to Register User, It might already exist in Blockchain";
        res.send(common.failureResponse(status.INTERNAL_SERVER_ERROR,msg,error.message));
        return;
    }
}

const addMoneyIntoWallet = async(req,res) => {
    data = req.body;
    let userAddress = data.userAddress,
        bankAddress = data.bankAddress,
        amount = data.amount;    
    try {

        const txHash = await Instance.addMoneyToWallet(userAddress,bankAddress,amount,defaultSender);
        const msg = "Amount successfully added into wallet!";
        res.send(common.successResponse(status.OK,msg,txHash));
        return;
    } catch(error) {
        const msg = "Failed to add money into wallet, Reason : Not enough Fund!";
        res.send(common.failureResponse(status.INTERNAL_SERVER_ERROR,msg,error.message));
        return;        
    }

}

const addMoneyIntoBank = async(req,res) => {
    data = req.body;
    let userAddress = data.userAddress,
        bankAddress = data.bankAddress,
        amount = data.amount;    
    try {

        const txHash = await Instance.addMoneyToBank(userAddress,bankAddress,amount,defaultSender);
        const msg = "Amount successfully added into Bank from wallet!";
        res.send(common.successResponse(status.OK,msg,txHash));
        return;
    } catch(error) {
        const msg = "Failed to add money into Bank, Reason : Not enough Fund!";
        res.send(common.failureResponse(status.INTERNAL_SERVER_ERROR,msg,error.message));
        return;        
    }

}

const transfer = async(req,res) => {
    const data = req.body;
    let from = data.from;
        to = data.to;
        amount = data.amount;

    try {
        const txHash = await Instance.transferMoney(from,to,amount,defaultSender);
        const msg = "Amount successfully transferred!";
        res.send(common.successResponse(status.OK,msg,txHash));
        return;
    } catch (error) {
        const msg = "Failed to transfer money, Reason : Not enough Fund!";
        res.send(common.failureResponse(status.INTERNAL_SERVER_ERROR,msg,error.message));
        return;         
    }
}

const bankDetail = async(req,res) => {
    const data = req.params;
    let bankAddress = req.params.bankAddress;
    try {
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
        res.send(common.successResponse(status.OK,msg,rest));
        //res.render('bankDetail',{rest})
        //return rest
    } catch(error) {
        const msg = "Something went wrong!";
        res.send(common.failureResponse(status.INTERNAL_SERVER_ERROR,msg,error.message));
        return;
    }
}


const userDetail = async(req,res) => {
    const data = req.params;
    let userAddress = data.userAddress;
    try {
        const result = await Instance.getUserDetail(userAddress,defaultSender);
        const msg = "User details!";
        const resp = {
            "Name" : result["0"],
            "walletBalance" : result["1"].toString(),
            "listOfBank" : result["2"],
            "Status" : result["3"]
        }
        res.send(common.successResponse(status.OK,msg,resp));
        return;
    } catch(error) {
        const msg = "Something went wrong!";
        res.send(common.failureResponse(status.INTERNAL_SERVER_ERROR,msg,error.message));
        return;
    }
}

const bankDetailOfUser = async(req,res) => {
    try {
        const data = await Instance.getBankDetailOfUser(req.params.userAddress, req.params.bankAddress, defaultSender);
        const msg = "Bank Details Of User!";
        console.log(data)
        res.send(common.successResponse(status.OK,msg,{"data" : {"bankBal" :parseInt(data)}}));
        return;
    } catch(error) {
        const msg = "Something went wrong!";
        res.send(common.failureResponse(status.INTERNAL_SERVER_ERROR,msg,error.message));
        return;
    }
}

module.exports = {
    addBank,
    addUsers,
    addMoneyIntoWallet,
    addMoneyIntoBank,
    transfer,
    bankDetail,
    userDetail,
    bankDetailOfUser
}

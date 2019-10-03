# Smart Contract Overview

1. Banks and Users can be add/registered into blockchain using this smart contract.
2. Users can top up/depoist money into their wallet, transferring money into wallet from their Bank Balance.
3. Smart contract Support transfer of money between two users.
4. Users can also withdraw money from their wallet to Bank Balance.

# This Project Consists of following this.

 - Smart Contract
 - API
 - User Interface

# Tech Stack
# 1. Ethereum 
   - Development Framework : TruffleFramework
   - Smart Contract Language : Solidity
# 2. NodeJS
   - Web3JS, ExpressJS, HTML/CSS, REST API


# Prerequisites
    - NodeJS version 8.11.x
    - Web3JS version 0.20.3
    - Truffle Framework version 4.1.11
    - Ganache-Cli for Ethereum Blockchain.

# Installation
    - NodeJS
        Link : https://nodejs.org/en/blog/release/v8.11.4/
    - Web3JS
        command : npm install -g web3@^0.20
    - Truffle Framework
        command : npm install -g truffle framework
    - Ganache
        Link : https://truffleframework.com/ganache
        Mnemonics : bronze banana apology roof stem album swift grit surprise venue ramp pen

# Depolying and testing Smart contract
    - Using Remix
    => Copy contract contract code from contracts/NPCI.sol
    => Using compiler version 0.4.24
    => Press on Deploy

    => In below example there 2 banks and each having 1 users
    ===================================================================
    => Bank Address 
    1. 0xb07A934763216E96922Ffa85268293EDcc2Bf0f5
    2. 0x7Ad22966C9d649183bd1D42e172C2a26Ec4C3122

    => User Address 
    1. 0xA35d427d81335053a90C4f494EE7C34E0DcC98c8
    2. 0x26F75bE9c6CFd9D629EB041235d61C359457115d
    ====================================================================
# Add Bank into Blockchain

function : addBank
bank 1: `"0xb07A934763216E96922Ffa85268293EDcc2Bf0f5","Bank Of India"`
bank 2: `"0x7Ad22966C9d649183bd1D42e172C2a26Ec4C3122","Kotak"`


# Add User in Bank into Blockchain
function : addUser
`"0xA35d427d81335053a90C4f494EE7C34E0DcC98c8","0xb07A934763216E96922Ffa85268293EDcc2Bf0f5",10000,"Jaydeep"`
`"0x26F75bE9c6CFd9D629EB041235d61C359457115d","0x7Ad22966C9d649183bd1D42e172C2a26Ec4C3122",10000,"Ankit"`


# Add Money into Wallet
function : addMoneyToWallet 
`"0xA35d427d81335053a90C4f494EE7C34E0DcC98c8","0xb07A934763216E96922Ffa85268293EDcc2Bf0f5",100`

# Add Money into Bank
function : addMoneyToBank
`"0x26F75bE9c6CFd9D629EB041235d61C359457115d","0x7Ad22966C9d649183bd1D42e172C2a26Ec4C3122",25`


# Transfer Money
function : transferMoney
`"0xA35d427d81335053a90C4f494EE7C34E0DcC98c8","0x26F75bE9c6CFd9D629EB041235d61C359457115d",50`

# Bank Detail
function : getBankDetail
bank 1 : `"0xb07A934763216E96922Ffa85268293EDcc2Bf0f5"`
bank 2 : `"0x7Ad22966C9d649183bd1D42e172C2a26Ec4C3122"`

# UserDetails
function : getUserDetail
`"0xA35d427d81335053a90C4f494EE7C34E0DcC98c8"`
`"0x26F75bE9c6CFd9D629EB041235d61C359457115d"`


# Bank Details of Users
function : getBankDetailOfUser
`"0xA35d427d81335053a90C4f494EE7C34E0DcC98c8","0xb07A934763216E96922Ffa85268293EDcc2Bf0f5"`
`"0x26F75bE9c6CFd9D629EB041235d61C359457115d","0x7Ad22966C9d649183bd1D42e172C2a26Ec4C3122"`

# Deploying Smart contract using Truffle

    Steps
    1. Get into root folder 
    2. Start Ganache
    3. Configure blockchain rpc ports in truffle-config file
    4. Deploying contract 
        command :  truffle migrate --reset

# Steps for Running Web API and Web APP

 `$ npm install `
 
 `$ npm start `

# WebAPP url 
    http://localhost:3000/

# Web API
    Import api.json into post
    Postman collection 
    Link : https://documenter.getpostman.com/view/4207339/S17wPmgU
    













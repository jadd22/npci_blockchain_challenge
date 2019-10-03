pragma solidity ^0.4.24;

contract NPCI {
    
    struct Bank {
        string name;
        address[] listOfUsers;
        mapping(address => bool) userExist;
        bool isExist;
    }
    
    struct User {
        string name;
        uint256 walletBal;
        bool isExist;
        address[] listOfBank;
        mapping(address => uint256) bankBal;
    }
    
    //Bank details from wallet address
    mapping(address => Bank) public bankDetail;
    mapping(address => User) public userDetail;
    
    function addBank(address _bankAddress, string _name) public returns(bool) {
        require(!bankDetail[_bankAddress].isExist,
                "Bank is Already registered in system");
        bankDetail[_bankAddress].name = _name;
        //bankDetailByName[sha256(_name)] = _walletAddress;
        bankDetail[_bankAddress].isExist = true;
        return true;
    }
    
    
    function addUser(address _userAddress,
                        address _bankAddress,
                        uint256 _bankBal, 
                        string _name) 
            public returns(bool) {
        Bank storage bank = bankDetail[_bankAddress];
        User storage users = userDetail[_userAddress];
        require(!bank.userExist[_userAddress] && !users.isExist,"User already registed with this bank");
        users.name = _name;
        users.bankBal[_bankAddress] = _bankBal;
        users.walletBal = 0;
        users.listOfBank.push(_bankAddress);
        bank.listOfUsers.push(_userAddress);
        bank.userExist[_userAddress] = true;
        users.isExist = true;
        return true;   
    }

    function addMoneyToWallet(address _userAddress,
                                address _bankAddress,
                                uint256 _amount)
            public returns(bool) {
        Bank storage bank = bankDetail[_bankAddress];
        User storage user = userDetail[_userAddress];
        require(bank.userExist[_userAddress],"User not registed with this bank");
        require(_amount > 0 && user.bankBal[_bankAddress] > _amount,"Not enough fund");
        user.walletBal += _amount;
        user.bankBal[_bankAddress] -= _amount; 
        return true;
    }

    function addMoneyToBank(address _userAddress,
                            address _bankAddress,
                            uint256 _amount)
            public returns(bool) {
        Bank storage bank = bankDetail[_bankAddress];
        User storage user = userDetail[_userAddress];
        require(bank.userExist[_userAddress],"User not registed with this bank");
        require(_amount > 0 && user.walletBal > _amount,"Not enough fund");
        user.walletBal -= _amount;
        user.bankBal[_bankAddress] += _amount;
        return true;
    }


    function getBankDetail(address _bankAddress) public view returns(string,address[],bool) {
        Bank memory bank = bankDetail[_bankAddress];
        return(
            bank.name,
            bank.listOfUsers,
            bank.isExist
        );
    }

    function getUserDetail(address _userAddress) public view returns(string,uint256,address[],bool) {
        User memory user = userDetail[_userAddress];
        return(
            user.name,
            user.walletBal,
            user.listOfBank,
            user.isExist
        );
    }
    
    function getBankDetailOfUser(address _userAddress, address _bankAddress) public view returns(uint256) {
        return(
                userDetail[_userAddress].bankBal[_bankAddress]
            );
    }
 
    function transferMoney(address _from, address _to, uint256 _amount) public returns(bool) {
        User storage sender = userDetail[_from];
        User storage receiver = userDetail[_to];
        require(sender.walletBal > _amount && _amount > 0, "Not Enough Fund with user!");
        require(receiver.isExist,"No such user in system");
        sender.walletBal -= _amount;
        receiver.walletBal += _amount;
        return true;
    }
}
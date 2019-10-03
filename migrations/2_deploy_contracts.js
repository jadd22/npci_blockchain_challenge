var contract = artifacts.require("./NPCI.sol");

module.exports = function (deployer) {
    deployer.deploy(contract);
  };
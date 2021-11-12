const RentDeal = artifacts.require("RentDeal");

module.exports = function(deployer) {
  deployer.deploy(RentDeal,"a","b");
};
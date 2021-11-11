const AssignableERC721 = artifacts.require("AssignableERC721");

module.exports = function(deployer) {
  deployer.deploy(AssignableERC721);
};

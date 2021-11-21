// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./RentableERC721.sol";

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

struct RentDeal {
    uint256 duration;
    uint256 startedTime;
    uint256 amountOfERA;
    uint256 assigneeTokenId;
    address tenant;
    bool disabled;
}

contract RentDealer is RentableERC721 {
    RentDeal[] public deals;
    IERC20 public ERAToken;
    address feeAccount;
    uint256 fee = 10;
    event AddRentDeal(uint256 indexed duration, uint256 indexed index,uint256 assigneeTokenId);
    event ChangeDisableRentDeal(uint256 indexed index, bool disabled);
    event ChangePriceRentDeal(uint256 indexed index, uint256 price);
    event RentDealPurchased(uint256 indexed index, uint256 indexed startedTime, address indexed tenant);

    constructor (IERC20 ERA,address _feeAccount,string memory name_, string memory symbol_) RentableERC721(name_, symbol_) {
        ERAToken = ERA;
        feeAccount =  _feeAccount;
    }

    function addRentDeal(uint256 assigneeTokenId,uint256 duration,uint256 amountOfERA) public {
        require(ownerOf(assigneeTokenId) == msg.sender,  "AssignableERC721: assign of token that is not own");
        deals.push(RentDeal (duration,0,amountOfERA,assigneeTokenId, address(0),false));
        emit AddRentDeal(duration, deals.length - 1, assigneeTokenId);
    }

    function disableRentDeal(uint256 index) public{
        RentDeal storage rentDeal = deals[index];
        require(ownerOf(rentDeal.assigneeTokenId) == msg.sender,  "AssignableERC721: assign of token that is not own");
        rentDeal.disabled = !rentDeal.disabled;
        emit ChangeDisableRentDeal(index, rentDeal.disabled);
    }

    function editRentDealPrice(uint256 index,uint256 price) public{
        RentDeal storage rentDeal = deals[index];
        require(ownerOf(rentDeal.assigneeTokenId) == msg.sender,  "AssignableERC721: assign of token that is not own");
        rentDeal.amountOfERA = price;
        emit ChangePriceRentDeal(index, price);
    }


    function purchaseRentDeal(uint256 index) public{
        RentDeal storage rentDeal = deals[index];
        require(rentDeal.tenant == address(0) || rentDeal.startedTime + rentDeal.duration <= block.timestamp,  "AssignableERC721: assign of token that is not own");
        require(!rentDeal.disabled,  "AssignableERC721: assign of token that is not own");
        require(ERAToken.transferFrom(msg.sender,ownerOf(rentDeal.assigneeTokenId),rentDeal.amountOfERA * (1000 - fee) / 1000),  "AssignableERC721: assign of token that is not own");
        require(ERAToken.transferFrom(msg.sender,feeAccount,rentDeal.amountOfERA * fee / 1000),  "AssignableERC721: assign of token that is not own");

        rentDeal.startedTime = block.timestamp;
        rentDeal.tenant = msg.sender;
        tokenAccessor[rentDeal.assigneeTokenId].tenant = msg.sender;
        tokenAccessor[rentDeal.assigneeTokenId].dueDate = block.timestamp + rentDeal.duration;
        
        if(assignedNFTs[rentDeal.assigneeTokenId] > 0)
            _removeAssignor(rentDeal.assigneeTokenId, assignedNFTs[rentDeal.assigneeTokenId]);

        emit RentDealPurchased(index, block.timestamp, msg.sender);
    }

    function finishRentDeal(uint256 index) public{
        RentDeal storage rentDeal = deals[index];
        require(rentDeal.startedTime + rentDeal.duration <= block.timestamp,  "AssignableERC721: assign of token that is not own");

        rentDeal.tenant = address(0);
        tokenAccessor[rentDeal.assigneeTokenId].tenant = address(0);
        if(assignedNFTs[rentDeal.assigneeTokenId] > 0)
            _removeAssignor(rentDeal.assigneeTokenId, assignedNFTs[rentDeal.assigneeTokenId]);
    }

}
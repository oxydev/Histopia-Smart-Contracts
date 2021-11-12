// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./RentableERC721.sol";

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

struct RentType {
    uint256 duration;
    uint256 startedTime;
    uint256 amountOfERA;
    uint256 assigneeTokenId;
    address renter;
    address tenant;
    bool disabled;
}

contract RentDeal is RentableERC721 {
    RentType[] deals;
    IERC20 public ERAToken = IERC20(0xd9145CCE52D386f254917e481eB44e9943F39138);
    event AddRentDeal(address indexed renter, uint256 indexed duration, uint256 indexed index,uint256 assigneeTokenId);
    event ChangeDisableRentDeal(uint256 indexed index, bool disabled);
    event ChangePriceRentDeal(uint256 indexed index, uint256 price);
    event RentDealPurchased(uint256 indexed index, uint256 indexed startedTime, address indexed tenant);

    constructor (string memory name_, string memory symbol_) RentableERC721(name_, symbol_) {
        
    }

    function addRentDeal(uint256 assigneeTokenId,uint256 duration,uint256 amountOfERA) public {
        require(ownerOf(assigneeTokenId) == msg.sender,  "AssignableERC721: assign of token that is not own");
        deals.push(RentType (duration,0,amountOfERA,assigneeTokenId,msg.sender, address(0),false));
        emit AddRentDeal(msg.sender, duration, deals.length - 1, assigneeTokenId);
    }

    function disableRentDeal(uint256 index) public{
        RentType storage rentDeal = deals[index];
        require(rentDeal.renter == msg.sender,  "AssignableERC721: assign of token that is not own");
        rentDeal.disabled = !rentDeal.disabled;
        emit ChangeDisableRentDeal(index, rentDeal.disabled);
    }

    function editRentDealPrice(uint256 index,uint256 price) public{
        RentType storage rentDeal = deals[index];
        require(rentDeal.renter == msg.sender,  "AssignableERC721: assign of token that is not own");
        rentDeal.amountOfERA = price;
        emit ChangePriceRentDeal(index, price);
    }


    function purchaseRentDeal(uint256 index) public{
        RentType storage rentDeal = deals[index];
        require(rentDeal.tenant == address(0) || rentDeal.startedTime + rentDeal.duration <= block.timestamp,  "AssignableERC721: assign of token that is not own");
        require(!rentDeal.disabled,  "AssignableERC721: assign of token that is not own");
        require(ERAToken.transferFrom(msg.sender,rentDeal.renter,rentDeal.amountOfERA),  "AssignableERC721: assign of token that is not own");

        rentDeal.startedTime = block.timestamp;
        rentDeal.tenant = msg.sender;
        tokenAccessor[rentDeal.assigneeTokenId].tenant = msg.sender;
        tokenAccessor[rentDeal.assigneeTokenId].dueDate = block.timestamp + rentDeal.duration;
        
        if(assignedNFTs[rentDeal.assigneeTokenId] > 0)
            _removeAssignor(rentDeal.assigneeTokenId, assignedNFTs[rentDeal.assigneeTokenId]);

        emit RentDealPurchased(index, block.timestamp, msg.sender);
    }

    function finishRentDeal(uint256 index) public{
        RentType storage rentDeal = deals[index];
        require(rentDeal.startedTime + rentDeal.duration <= block.timestamp,  "AssignableERC721: assign of token that is not own");

        rentDeal.tenant = address(0);
        tokenAccessor[rentDeal.assigneeTokenId].tenant = address(0);
        if(assignedNFTs[rentDeal.assigneeTokenId] > 0)
            _removeAssignor(rentDeal.assigneeTokenId, assignedNFTs[rentDeal.assigneeTokenId]);
    }

}
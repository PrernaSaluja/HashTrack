// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract HashTrack {
    
    struct Product {
        uint id;
        string name;
        string description;
        address manufacturer;
        bool isVerified;
        uint timestamp;
    }
    
    uint public productCount;
    mapping(uint => Product) public products;

    // Event to emit when a product is added
    event ProductAdded(uint id, string name, address manufacturer);
    
    // Event to emit when a product is verified
    event ProductVerified(uint id, bool isVerified);
    
    // Add a new product to the supply chain
    function addProduct(string memory _name, string memory _description) public {
        productCount++;
        products[productCount] = Product({
            id: productCount,
            name: _name,
            description: _description,
            manufacturer: msg.sender,
            isVerified: false,
            timestamp: block.timestamp
        });
        
        emit ProductAdded(productCount, _name, msg.sender);
    }

    // Verify a product's authenticity
    function verifyProduct(uint _productId) public {
        require(products[_productId].id != 0, "Product does not exist.");
        products[_productId].isVerified = true;
        
        emit ProductVerified(_productId, true);
    }

    // Get product details
    function getProduct(uint _productId) public view returns (uint, string memory, string memory, address, bool, uint) {
        require(products[_productId].id != 0, "Product does not exist.");
        Product memory p = products[_productId];
        return (p.id, p.name, p.description, p.manufacturer, p.isVerified, p.timestamp);
    }
}

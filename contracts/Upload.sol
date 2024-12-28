// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    struct Access {
        address user;
        bool access;
    }

    mapping(address => string[]) value; //array to store the list of pictures to a particular address.
    mapping(address => Access[]) accessList; //list to all adresses that are given access bby a particular address
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => mapping(address => bool)) previousData; //since it is entirely blockchain based, no server is used, therefore previous dta needs to be stored.

    //function to add the picture url to a particular user
    function add(address _user, string memory _url) external {
        value[_user].push(_url);
    }

    //function to allow the access
    function allow(address user) external {
        ownership[msg.sender][user] = true;
        if(previousData[msg.sender][user])
        {
            for(uint i = 0; i<accessList[msg.sender].length; i++)
                if(accessList[msg.sender][i].user == user)
                    accessList[msg.sender][i].access = true;
        }else{
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
        
    }

    //function to disallow
    function revoke(address user) public {
        ownership[msg.sender][user] = false;
        for(uint i = 0; i<accessList[msg.sender].length; i++)
            if(accessList[msg.sender][i].user == user)
                accessList[msg.sender][i].access = false;
        
    }

    //display the images of the user
    function display(address _user) external view returns(string[] memory)
    {
        require(_user == msg.sender || ownership[_user][msg.sender], "Do not have access to view!");
        return value[_user];
    }

    //to view the access list
    function shareAccess() public view returns(Access[] memory){
        return accessList[msg.sender];
    }
}
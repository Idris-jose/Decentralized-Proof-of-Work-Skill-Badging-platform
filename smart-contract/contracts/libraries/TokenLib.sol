// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

library TokenLib {
    // Custom errors
    error TokenDoesNotExist();
    error TokenUriRequired();
    error SkillNameRequired();
    
    function requireTokenExists(bool tokenExists) internal pure {
        if (!tokenExists) {
            revert TokenDoesNotExist();
        }
    }
    
    function validateAndRequireNonEmptyString(string memory str, string memory field) internal pure {
        if (bytes(str).length == 0) {
            if (keccak256(bytes(field)) == keccak256("uri")) {
                revert TokenUriRequired();
            } else {
                revert SkillNameRequired();
            }
        }
    }
}
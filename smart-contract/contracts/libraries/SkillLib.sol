// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

library SkillLib {
    struct Skill {
        string skillName;
        string description;
        uint256 timestamp;
        address issuer;
        string skillType;
    }
    
    function createSkill(
        string memory skillName,
        string memory description,
        string memory skillType,
        address issuer
    ) internal view returns (Skill memory) {
        return Skill({
            skillName: skillName,
            description: description,
            timestamp: block.timestamp,
            issuer: issuer,
            skillType: skillType
        });
    }
}
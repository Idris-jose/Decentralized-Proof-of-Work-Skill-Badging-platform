// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./libraries/TokenLib.sol";
import "./libraries/SkillLib.sol";

contract SkillBadge is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    mapping(uint256 => SkillLib.Skill) public skills;

    event SkillBadgeMinted(
        address indexed to,
        uint256 indexed tokenId,
        string skillName,
        string skillType
    );

    event SkillBadgeRevoked(uint256 indexed tokenId);

    constructor(address initialOwner)
        ERC721("SkillBadge", "SKILL")
        Ownable(initialOwner)
    {}

    function mintSkillBadge(
        address to,
        string memory uri,
        string memory skillName,
        string memory description,
        string memory skillType
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        skills[tokenId] = SkillLib.createSkill(skillName, description, skillType, msg.sender);

        emit SkillBadgeMinted(to, tokenId, skillName, skillType);

        return tokenId;
    }

    function revokeSkillBadge(uint256 tokenId) public onlyOwner {
        TokenLib.requireTokenExists(_ownerOf(tokenId) != address(0));

        _burn(tokenId);
        delete skills[tokenId];

        emit SkillBadgeRevoked(tokenId);
    }

    function getSkillDetails(uint256 tokenId)
        public
        view
        returns (
            string memory skillName,
            string memory description,
            uint256 timestamp,
            address issuer,
            string memory skillType
        )
    {
        TokenLib.requireTokenExists(_ownerOf(tokenId) != address(0));

        SkillLib.Skill memory skill = skills[tokenId];
        return (
            skill.skillName,
            skill.description,
            skill.timestamp,
            skill.issuer,
            skill.skillType
        );
    }

    function mintSelfSkillBadge(
        string memory uri,
        string memory skillName,
        string memory description,
        string memory skillType
    ) public returns (uint256) {
        TokenLib.validateAndRequireNonEmptyString(uri, "uri");
        TokenLib.validateAndRequireNonEmptyString(skillName, "skillName");

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        skills[tokenId] = SkillLib.createSkill(skillName, description, skillType, msg.sender);

        emit SkillBadgeMinted(msg.sender, tokenId, skillName, skillType);

        return tokenId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }

    // Overrides for ERC721URIStorage
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

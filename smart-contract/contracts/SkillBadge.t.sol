// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "./SkillBadge.sol";

contract SkillBadgeTest is Test {
    SkillBadge skillBadge;
    address owner = address(0xA11CE);
    address addr1 = address(0xBEEF);
    address addr2 = address(0xCAFE);

    function setUp() public {
        vm.prank(owner);
        skillBadge = new SkillBadge(owner);
    }

    function testDeployment() public view {
        assertEq(skillBadge.owner(), owner);
        assertEq(skillBadge.name(), "SkillBadge");
        assertEq(skillBadge.symbol(), "SKILL");
    }

    function testOwnerCanMintSkillBadge() public {
        vm.prank(owner);
        uint256 tokenId = skillBadge.mintSkillBadge(
            addr1,
            "ipfs://badge1",
            "Solidity Developer",
            "Proficient in writing smart contracts",
            "Technical"
        );

        assertEq(tokenId, 0);
        assertEq(skillBadge.ownerOf(tokenId), addr1);
        assertEq(skillBadge.tokenURI(tokenId), "ipfs://badge1");

        (string memory name, string memory desc,, address issuer, string memory skillType) =
            skillBadge.getSkillDetails(tokenId);

        assertEq(name, "Solidity Developer");
        assertEq(desc, "Proficient in writing smart contracts");
        assertEq(issuer, owner);
        assertEq(skillType, "Technical");
    }

    function testNonOwnerCannotMintSkillBadge() public {
        vm.expectRevert(); // OwnableUnauthorizedAccount
        vm.prank(addr1);
        skillBadge.mintSkillBadge(
            addr1,
            "ipfs://unauthorized",
            "Hackathon Winner",
            "Unauthorized mint",
            "Achievement"
        );
    }

    function testSelfMintSkillBadge() public {
        vm.prank(addr1);
        uint256 tokenId = skillBadge.mintSelfSkillBadge(
            "ipfs://selfmint",
            "Blockchain Researcher",
            "Published research on consensus algorithms",
            "Research"
        );

        assertEq(skillBadge.ownerOf(tokenId), addr1);
        assertEq(skillBadge.tokenURI(tokenId), "ipfs://selfmint");

        (string memory name,, , address issuer, string memory skillType) =
            skillBadge.getSkillDetails(tokenId);

        assertEq(name, "Blockchain Researcher");
        assertEq(issuer, addr1);
        assertEq(skillType, "Research");
    }

    function testSelfMintRequiresValidInputs() public {
        vm.startPrank(addr1);

        vm.expectRevert("SkillBadge: Token URI is required");
        skillBadge.mintSelfSkillBadge("", "Empty URI", "Test", "General");

        vm.expectRevert("SkillBadge: Skill name is required");
        skillBadge.mintSelfSkillBadge("ipfs://bad", "", "Test", "General");

        vm.stopPrank();
    }

    function testRevokeSkillBadge() public {
    // Owner mints
    vm.prank(owner);
    uint256 tokenId = skillBadge.mintSkillBadge(
        addr1,
        "ipfs://revokable",
        "React Developer",
        "Certified Frontend Developer",
        "Technical"
    );

    // Revoke
    vm.prank(owner);
    skillBadge.revokeSkillBadge(tokenId);

    vm.expectRevert(); // ownerOf should revert (token burned)
    skillBadge.ownerOf(tokenId);

    // Expect getSkillDetails to revert with the proper message
    vm.expectRevert("SkillBadge: Token does not exist");
    skillBadge.getSkillDetails(tokenId);
}


    function testCannotRevokeByNonOwner() public {
        vm.prank(owner);
        uint256 tokenId = skillBadge.mintSkillBadge(
            addr1,
            "ipfs://badge",
            "Frontend Developer",
            "HTML/CSS/JS",
            "Technical"
        );

        vm.prank(addr1);
        vm.expectRevert();
        skillBadge.revokeSkillBadge(tokenId);
    }

    function testGetSkillDetails() public {
        vm.prank(owner);
        uint256 tokenId = skillBadge.mintSkillBadge(
            addr1,
            "ipfs://detail",
            "Python Developer",
            "Expert in scripting and automation",
            "Technical"
        );

        (string memory name, string memory desc,, address issuer, string memory skillType) =
            skillBadge.getSkillDetails(tokenId);

        assertEq(name, "Python Developer");
        assertEq(desc, "Expert in scripting and automation");
        assertEq(issuer, owner);
        assertEq(skillType, "Technical");
    }

    function testTotalSupply() public {
        assertEq(skillBadge.totalSupply(), 0);

        vm.prank(owner);
        skillBadge.mintSkillBadge(
            addr1,
            "ipfs://badge1",
            "Solidity",
            "Smart contract developer",
            "Technical"
        );

        vm.prank(addr1);
        skillBadge.mintSelfSkillBadge(
            "ipfs://badge2",
            "AI Engineer",
            "ML and AI projects",
            "Technical"
        );

        assertEq(skillBadge.totalSupply(), 2);
    }
}

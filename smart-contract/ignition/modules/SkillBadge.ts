import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SkillBadgeModule", (m) => {
  const initialOwner = m.getParameter("initialOwner");

  // Deploy the SkillBadge contract, passing initialOwner to the constructor
  const skillBadge = m.contract("SkillBadge", [initialOwner]);

  return { skillBadge };
});


// Deployed Address: 0xB19B77e2a61725A8c4627123f404DB3c32D146b0
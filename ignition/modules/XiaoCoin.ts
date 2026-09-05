import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("XiaoCoinModule", (m) => {
  const treasury = m.getParameter("treasury");
  const xiaoCoin = m.contract("XiaoCoin", [treasury]);

  return { xiaoCoin };
});

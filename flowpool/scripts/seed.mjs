import { PrismaClient } from "../apps/api/node_modules/@prisma/client/default.js";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@flowpool.app" },
    update: {
      name: "Lorena Demo",
      walletAddress: "0x8f92a87781C69fb4a1dA9eA8Bbe7F6bE8410FEED",
      pixIdentifier: "lorena-demo@flowpool.app"
    },
    create: {
      name: "Lorena Demo",
      email: "demo@flowpool.app",
      walletAddress: "0x8f92a87781C69fb4a1dA9eA8Bbe7F6bE8410FEED",
      pixIdentifier: "lorena-demo@flowpool.app"
    }
  });

  const account = await prisma.account.upsert({
    where: { id: 1 },
    update: {
      userId: user.id,
      totalBalance: 12.8,
      availableBalance: 7.6,
      pooledBalance: 10.4,
      yieldBalance: 0.8,
      autoRechargeEnabled: true,
      autoRechargeThreshold: 5,
      suggestedRechargeAmount: 20
    },
    create: {
      id: 1,
      userId: user.id,
      totalBalance: 12.8,
      availableBalance: 7.6,
      pooledBalance: 10.4,
      yieldBalance: 0.8,
      autoRechargeEnabled: true,
      autoRechargeThreshold: 5,
      suggestedRechargeAmount: 20
    }
  });

  await prisma.poolState.upsert({
    where: { id: 1 },
    update: {
      totalLiquidity: 10.4,
      availableLiquidity: 7.6,
      allocatedLiquidity: 1.8,
      safetyReserve: 1,
      policyMode: "balanced"
    },
    create: {
      id: 1,
      totalLiquidity: 10.4,
      availableLiquidity: 7.6,
      allocatedLiquidity: 1.8,
      safetyReserve: 1,
      policyMode: "balanced"
    }
  });

  await prisma.agent.deleteMany({
    where: { accountId: account.id }
  });

  await prisma.agent.createMany({
    data: [
      {
        accountId: account.id,
        name: "SalesBot",
        status: "active",
        maxBudget: 40,
        currentSpend: 6.4,
        priority: "high",
        permissionsJson: JSON.stringify(["can_use_api", "can_use_ai"])
      },
      {
        accountId: account.id,
        name: "DataBot",
        status: "active",
        maxBudget: 24,
        currentSpend: 5.1,
        priority: "medium",
        permissionsJson: JSON.stringify(["can_use_api", "can_trigger_usage"])
      },
      {
        accountId: account.id,
        name: "OpsBot",
        status: "paused",
        maxBudget: 18,
        currentSpend: 1.2,
        priority: "medium",
        permissionsJson: JSON.stringify(["can_pay_agents", "can_trigger_usage"])
      }
    ]
  });
}

main()
  .catch(async (error) => {
    console.error(error);
    process.exitCode = 1;
    await prisma.$disconnect();
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

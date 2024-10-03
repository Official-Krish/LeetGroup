import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const calculateDailyPerformance = async () => {
  const groups = await prisma.group.findMany({
    include: {
      members: true, 
    },
  });

  for (const group of groups) {
    for (const member of group.members) {
      const solvedCount = await fetchSolvedProblems(member.leetcodeId); 

      await prisma.performance.upsert({
        where: {
          userId_groupId: {
            userId: member.id,
            groupId: group.id, 
          },
        },
        update: {
          solvedCount: solvedCount,
          createdAt: new Date(), 
        },
        create: {
          userId: member.id,
          groupId: group.id, 
          solvedCount: solvedCount,
        },
      });
    }
  }
};

const fetchSolvedProblems = async (leetcodeId: string): Promise<number> => {
  return Math.floor(Math.random() * 100); // Mocking for now
};

export default calculateDailyPerformance;

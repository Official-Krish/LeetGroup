import axios from 'axios';
import { prisma } from './db';


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
            groupId: group.groupId, 
          },
        },
        update: {
          solvedCount: solvedCount,
          createdAt: new Date(),
        },
        create: {
          userId: member.id,
          groupId: group.groupId, // Ensure this is the correct groupId type (string)
          solvedCount: solvedCount,
        },
      });
    }
  }
};

export const fetchSolvedProblems = async (leetcodeId: string): Promise<number> => {
  const res = await axios.get(`https://leetcode-stats-api.herokuapp.com/${leetcodeId}`);
  return res.data.totalSolved;
};

export default calculateDailyPerformance;

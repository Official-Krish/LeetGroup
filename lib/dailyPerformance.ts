import axios from 'axios';
export const fetchSolvedProblems = async (leetcodeId: string): Promise<number> => {
  const res = await axios.get(`https://leetcode-stats-api.herokuapp.com/${leetcodeId}`);
  return res.data.totalSolved;
};


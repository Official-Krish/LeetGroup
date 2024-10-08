import axios from 'axios';

interface details {
  sheet_sde : number,
  sheet_a2z : number,
  sheet_79 : number
}

export const fetchSolvedProblems = async (leetcodeId: string): Promise<number> => {
  const res = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${leetcodeId}`);
  return res.data.totalSolved;
};

export const fetchStriverDetails = async ( id : string ): Promise<details> => {
  const res = await axios.get(`https://backend.takeuforward.org/api/profile/user/progress/${id}`);
  return res.data;
}
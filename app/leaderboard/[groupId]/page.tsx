"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Performance {
  user: {
    username: string;
  };
  solvedCount: number;
  createdAt: string;
}

const Leaderboard = () => {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [solved , setSolved] = useState<number>();
  const { groupId } = useParams();
  let prev : number;

  useEffect(() => {
    if (groupId) {
      const fetchLeaderboard = async () => {
        try {
          const response = await axios.get(`/api/leaderboard?groupId=${groupId}`);
          if (solved === undefined) {
            prev = 0;
          } else {
            prev = solved;
          }
          setSolved(response.data[0].solvedCount - prev);
          setPerformances(response.data);
        } catch (error) {
          console.error('Error fetching leaderboard:', error);
        }
      };
      fetchLeaderboard();
    }
  }, [groupId]);

  return (
    <div>
      <h1>Leaderboard for Group {groupId}</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rank</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Username</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Solved Count</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {performances.map((performance, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{performance.user.username}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{solved}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(performance.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

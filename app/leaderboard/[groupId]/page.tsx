"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Performance {
  user: {
    username: string;
  };
  solvedCount: number;
  createdAt: string;
  group: {
    name: string;
  };
}

const Leaderboard = () => {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const { groupId } = useParams();

  useEffect(() => {
    if (groupId) {
      const fetchLeaderboard = async () => {
        try {
          const response = await axios.get(`/api/leaderboard?groupId=${groupId}`);
          setPerformances(response.data);
        } catch (error) {
          console.error('Error fetching leaderboard:', error);
        }
      };
      fetchLeaderboard();
    }
  }, [groupId]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="outline" className="mb-6" onClick={() => {}}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Group
        </Button>

        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center justify-between">
              {performances.length > 0 ? (
                <span>{performances[0].group.name} Leaderboard</span>
              ) : (
                <span>Leaderboard</span>
              )}
              <Trophy className="h-6 w-6 text-yellow-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Problems Solved</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performances.map((performance, index) => (
                  <TableRow 
                    key={index} 
                    className={index === 0 ? 'bg-yellow-100 rounded-lg' : ''} 
                  >
                    <TableCell className="font-normal text-lg">{index + 1}</TableCell>
                    <TableCell className="font-normal text-lg">{performance.user.username}</TableCell>
                    <TableCell className="text-right font-light text-lg">{performance.solvedCount}</TableCell>
                    <TableCell className={`text-right text-md font-medium `}>
                      {index === 0 ? "Winner" : "Participant"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Leaderboard;

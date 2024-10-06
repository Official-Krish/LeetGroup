"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Gift, RefreshCw, Trophy, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSession } from 'next-auth/react';
import { Switch } from '@/components/ui/switch';

interface Performance {
  user: {
    username: string;
  };
  solvedCount: number;
  solvedDiff: number;
  createdAt: string;
  group: {
    name: string;
  };
}

interface DailyWinner {
  user: {
    username: string;
  };
  solvedCount: number;
  solvedDiff: number;
  createdAt: string;
  hasTreated: boolean;
}

const Leaderboard = () => {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const { groupId } = useParams();
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const session = useSession();
  const [pastWinners, setPastWinners] = useState<DailyWinner[]>([]);

  useEffect(() => {
    if (groupId) {
      const fetchLeaderboard = async () => {
        try {
          const response = await axios.get(`/api/leaderboard?groupId=${groupId}`);
          setPerformances(response.data);
          setRefresh(false);
        } catch (error) {
          console.error('Error fetching leaderboard:', error);
        }
      };

      const fetchPastWinners = async () => {
        try {
          const response = await axios.get(`/api/pastWinner?groupId=${groupId}`);
          setPastWinners(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching past winners:', error);
        }
      };

      fetchLeaderboard();
      fetchPastWinners();
    }
  }, [refresh]);

  // const handleTreatToggle = async (index: number) => {
  //   const updatedWinner = { ...pastWinners[index], hasTreated: !pastWinners[index].hasTreated };

  //   try {
  //     await axios.post('/api/updateTreatStatus', updatedWinner);
  //     setPastWinners((prevWinners) =>
  //       prevWinners.map((winner, i) => (i === index ? updatedWinner : winner))
  //     );
  //   } catch (error) {
  //     console.error('Error updating treat status:', error);
  //   }
  // };

  useEffect(() => {
    const savedWinners = localStorage.getItem('pastWinners');
    if (savedWinners) {
      setPastWinners(JSON.parse(savedWinners));
    }
  }, []);

  const handleTreatToggle = (index: number) => {
    setPastWinners((prevWinners) => {
      const updatedWinners = prevWinners.map((winner, i) => 
        i === index ? { ...winner, hasTreated: !winner.hasTreated } : winner
      );
  
      localStorage.setItem('pastWinners', JSON.stringify(updatedWinners));
      return updatedWinners;
    });
  };
  
  

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="outline" className="mb-6" onClick={() => router.push(`/groups`)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Group
        </Button>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
          <div className="p-6 flex justify-between items-center">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-primary mr-2" />
              <h1 className="text-2xl font-bold">{performances[0]?.group.name.toUpperCase()}</h1>
            </div>
            <Button variant="outline">View Group Details</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Current Leaderboard */}
          <div>
            <Card className="bg-white border-gray-200">
              <div className="p-6 flex justify-between items-center border-b border-gray-200">
                <h2 className="text-xl font-semibold flex items-center">
                  Leaderboard
                  <Trophy className="h-5 w-5 text-yellow-500 ml-2" />
                </h2>
                {session.data?.user?.email === "krishanand974@gmail.com" && (
                  <div>
                    <Button onClick={async () => {
                      setRefresh(true);
                      await axios.post("/api/ReloadStats");
                      window.location.reload();
                    }}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>
                  </div>
                )}
              </div>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Rank</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Problems Solved</TableHead>
                      <TableHead className="text-right">In 24hrs</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performances.map((performance, index) => (
                      <TableRow key={index} className={index === 0 ? 'bg-yellow-50' : ''}>
                        <TableCell className="font-normal text-lg">{index + 1}</TableCell>
                        <TableCell className="font-normal text-lg">{performance.user.username}</TableCell>
                        <TableCell className="text-right font-light text-lg">{performance.solvedCount}</TableCell>
                        <TableCell className="text-right font-extralight text-lg">
                          {performance.solvedDiff}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="inline-flex px-2 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            {index === 0 ? "Winner" : "Participant"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Past 10 Days Winners */}
          <div>
            <Card className="bg-white border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold flex items-center">
                  Last 10 Days Winners
                  <Calendar className="h-5 w-5 text-primary ml-2" />
                </h2>
              </div>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Problems Solved</TableHead>
                      <TableHead className="text-right">Treated?</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastWinners.map((winner, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(winner.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{winner.user.username}</TableCell>
                        <TableCell className="text-right">{winner.solvedDiff}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Switch
                              checked={winner.hasTreated}
                              onCheckedChange={() => {
                                if (winner.user.username === session.data?.user?.name) {
                                  handleTreatToggle(index);
                                }
                              }}                              
                            />
                            <Gift className={`h-4 w-4 ${winner.hasTreated ? 'text-green-500' : 'text-gray-300'}`} />
                          </div>
                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;

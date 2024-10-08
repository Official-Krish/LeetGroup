"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, Trophy, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSession } from 'next-auth/react';

interface Performance {
  user: {
    username: string;
  };
  AtoZ : number;
  SDE : number;
  sheet_79 : number;
  group: {
    name: string;
  };
}


const Leaderboard = () => {
    const [performances, setPerformances] = useState<Performance[]>([]);
    const { groupId } = useParams();
    const [refresh, setRefresh] = useState(false);
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if (groupId) {
        const fetchLeaderboard = async () => {
            try {
              const response = await axios.get(`/api/leaderboard?groupId=${groupId}`);
              console.log("response",response.data);
              setPerformances(response.data);
              setRefresh(false);
            } catch (error) {
              console.error('Error fetching leaderboard:', error);
            }
        };
        fetchLeaderboard();
    }}, [refresh]);

  
  

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
        <div>
            <Card className="bg-white border-gray-200">
              <div className="p-6 flex justify-between items-center border-b border-gray-200">
                <h2 className="text-xl font-semibold flex items-center">
                  Striver Sheets Progress
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
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">SDE (191)</TableHead>
                      <TableHead className="text-right">A to Z (455)</TableHead>
                      <TableHead className="text-right">Blind 79</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performances.map((performance, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-normal text-lg">{performance.user.username}</TableCell>
                        <TableCell className="text-right font-light text-lg">{Math.round((performance.SDE * 191) / 100)}</TableCell>
                        <TableCell className="text-right font-light text-lg">
                          {Math.round((performance.AtoZ * 455) / 100)}
                        </TableCell>
                        <TableCell className="text-right font-light text-lg">{Math.round((performance.sheet_79 * 79) / 100)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;

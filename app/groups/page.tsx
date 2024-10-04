"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Plus, TrendingUp, Users, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Group {
  id: string;
  name: string;
  groupId: string;
  members: {
    username : string;
    email: string;
  }[];
}

const Groups = () => {
  const { data: session } = useSession(); 
  const [groups, setGroups] = useState<Group[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        if (session?.user?.email) {
          const response = await axios.get(`/api/groups?email=${session.user.email}`);
          setGroups(response.data);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, [session]);

  const handleGroupSelect = (groupId: string) => {
    router.push(`/leaderboard/${groupId}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Groups</h1>
          <Button asChild>
            <Link href="/CreateGroup">
              <Plus className="mr-2 h-4 w-4" /> Create or Join Group
            </Link>
          </Button>
        </div>

        {groups.length === 0 ? (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6 text-center">
              <p className="text-gray-400">You haven't joined any groups yet.</p>
              <Button asChild className="mt-4">
                <Link href="/create-join-group">Create or Join a Group</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <Card key={group.id} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white font-semibold text-xl">{group.name.toUpperCase()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-gray-400 mb-4">
                    {group.members.map((member) => (
                      <div key={member.email} className="flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        <span className="text-lg">{
                          member.username === session?.user?.name ? "You" : member.username

                        }</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleGroupSelect(group.groupId)}>
                    <TrendingUp className="mr-2 h-4 w-4" /> View Leaderboard
                  </Button>
                  <Link className="bg-white rounded-lg py-1.5 px-2 font-normal flex" href={`/group/${group.id}`}>
                    <UsersRound className="h-5 w-5" />
                    <div className="ml-1">Group Details</div>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Groups;

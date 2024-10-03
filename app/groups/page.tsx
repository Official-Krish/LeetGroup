"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Group {
  id: string;
  name: string;
  groupId: string;
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
    <div>
      <h1>Select a Group</h1>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <button onClick={() => handleGroupSelect(group.groupId)}>
              {group.groupId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groups;

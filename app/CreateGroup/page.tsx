'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, Users, Copy } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useSession } from 'next-auth/react'

export default function CreateJoinGroupPage() {
    const session = useSession();
    if(!session) return null;

    const [roomId, setRoomId] = useState('')
    const [generatedRoomId, setGeneratedRoomId] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const generateRoomId = () => {
        const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase()
        setGeneratedRoomId(newRoomId)
    }

    const handleCreateGroup = async () => {
        if (!generatedRoomId) {
          setError('Please generate a room ID first');
          return; 
        }

        if (!session || !session.data || !session.data.user) {
          setError('User session is not available');
          return; 
        }
      
        try {
          const res = await axios.post('/api/createGroup', { 
            groupId: generatedRoomId,
            name: session.data.user.name, 
            email: session.data.user.email,
            leetCodeId: localStorage.getItem('leetcodeId'), 
          });
      
          if (res.status === 200) {
            router.push(`/`); 
          } else {
            setError('Failed to create group'); 
          }
        } catch (error) {
          console.error('Error creating group:', error); 
          setError('Failed to create group. Please try again.');
        }
      };
      

    const handleJoinGroup = async () => {
        const res = await axios.post('/api/joingroup', { 
            groupId: generatedRoomId,
            email: session?.data?.user?.email,
            leetCodeId: localStorage.getItem('leetcodeId'),
        })        
        if(res.status === 200) {
            router.push(`/`)
        }else{
            setError('Failed to join group')
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedRoomId)
        .then(() => alert('Room ID copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err))
    }

    return (
        <div className="flex min-h-screen bg-gray-950 text-gray-100">
        <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
            <div>
                <Link href="/" className="flex items-center justify-center text-primary">
                <Code2 className="h-8 w-8 mr-2 text-white" />
                <span className="text-2xl font-bold text-white">LeetGroup</span>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold">
                Create or Join a Group
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                Collaborate with friends and improve your coding skills together
                </p>
            </div>

            <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6">
                <Tabs defaultValue="create">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                    <TabsTrigger value="create">Create Group</TabsTrigger>
                    <TabsTrigger value="join">Join Group</TabsTrigger>
                    </TabsList>
                    <TabsContent value="create" className="mt-4">
                    <div className="space-y-4">
                        <div>
                        <Label htmlFor="generated-room-id" className='text-white'>Generated Room ID</Label>
                        <div className="flex mt-1">
                            <Input
                            id="generated-room-id"
                            type="text"
                            value={generatedRoomId}
                            readOnly
                            className="bg-gray-800 border-gray-700 text-white"
                            />
                            <Button
                            type="button"
                            variant="outline"
                            className="ml-2"
                            onClick={copyToClipboard}
                            >
                            <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                        </div>
                        <Button onClick={generateRoomId} className="w-full">
                        Generate Room ID
                        </Button>
                        <Button onClick={handleCreateGroup} className="w-full" disabled={!generatedRoomId}>
                        Create Group
                        </Button>
                    </div>
                    </TabsContent>
                    <TabsContent value="join" className="mt-4">
                    <form onSubmit={handleJoinGroup} className="space-y-4">
                        <div>
                        <Label htmlFor="room-id">Room ID</Label>
                        <Input
                            id="room-id"
                            type="text"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            placeholder="Enter Room ID"
                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                        />
                        </div>
                        <Button type="submit" className="w-full">
                        Join Group
                        </Button>
                    </form>
                    </TabsContent>
                </Tabs>
                </CardContent>
            </Card>

            {error && (
                <p className="text-center text-red-500">{error}</p>
            )}

            <div className="flex items-center justify-center">
                <Users className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm text-gray-400">
                Connect with fellow coders and challenge each other
                </span>
            </div>
            </div>
        </div>
        </div>
    )
}
"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Users, Zap, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function LandingPage() {
  const router = useRouter();
  const session = useSession();
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <main className="flex-1">
        {/* Section 1: Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-gray-900 to-gray-950 flex justify-center items-center">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                  Level Up Your Coding Game
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Join LeetGroup: Where coders compete, collaborate, and conquer LeetCode challenges together.
                </p>
              </div>
              <div className="space-x-4">
                {session?.data?.user && 
                  <div>
                    <Button variant="default" size="lg" onClick={()=> router.push('/CreateGroup')}>
                      Start Competing
                    </Button>
                    <Button variant="outline" size="lg" className="text-black hover:text-white hover:bg-gray-600">
                      Explore Features
                    </Button>
                  </div>
                }

                {!session?.data?.user && 
                  <div>
                    <Button variant="default" size="lg" onClick={()=> router.push('/signin')}>
                      Get Started
                    </Button>
                    <Button variant="outline" size="lg" className="text-black hover:text-white hover:bg-gray-600">
                      Explore Features
                    </Button>
                  </div>
                }
                
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why Choose Us */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 flex justify-center items-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Why Choose LeetGroup?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
              {/* Card 1 */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <Users className="h-12 w-12 text-white" />
                  <h3 className="text-xl font-bold text-white">Collaborative Groups</h3>
                  <p className="text-gray-400 text-center">
                    Form coding circles with friends or colleagues and motivate each other to excel.
                  </p>
                </CardContent>
              </Card>
              {/* Card 2 */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <Zap className="h-12 w-12 text-white" />
                  <h3 className="text-xl font-bold text-white">Daily Challenges</h3>
                  <p className="text-gray-400 text-center">
                    Tackle curated LeetCode problems and track your progress over time.
                  </p>
                </CardContent>
              </Card>
              {/* Card 3 */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <Trophy className="h-12 w-12 text-white" />
                  <h3 className="text-xl font-bold text-white">Dynamic Leaderboards</h3>
                  <p className="text-gray-400 text-center">
                    Compete to top your group's leaderboard and earn bragging rights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 3: Supercharge */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-950 flex justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Supercharge Your Coding Skills
                </h2>
                <p className="max-w-[600px] text-gray-400 md:text-xl">
                  With LeetGroup, you're not just solving problems – you're building a community of skilled developers.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-primary" />
                    <span>Personalized problem recommendations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Track your improvement over time</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Engage in friendly competition</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-lg">
                  <div className="absolute top-0 -left-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                  <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                  <div className="absolute -bottom-8 left-20 w-72 h-72 bg-tertiary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                  <div className="relative">
                    <div className="p-8 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl">
                      <h3 className="text-2xl font-bold mb-4">Today's Challenge</h3>
                      <p className="text-gray-400 mb-4">Solve the problem and climb the leaderboard!</p>
                      <Button className="w-full">Start Coding</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Call to Action */}
        {!session?.data?.user && 
         <div>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-gray-900 to-gray-950 flex justify-center items-center">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      Ready to Elevate Your Coding Journey?
                    </h2>
                    <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                      Join LeetGroup today and start your path to coding excellence.
                    </p>
                  </div>
                  <div className="w-full max-w-sm space-y-2">
                    <form className="flex space-x-2">
                      <Input
                        className="max-w-lg flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                        placeholder="Enter your email"
                        type="email"
                      />
                      <Button type="submit">Sign Up</Button>
                    </form>
                    <p className="text-xs text-gray-400">
                      By signing up, you agree to our{" "}
                      <Link className="underline underline-offset-2 hover:text-primary" href="#">
                        Terms & Conditions
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        }
        
      </main>
    </div>
  )
}

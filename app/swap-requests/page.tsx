"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ArrowRightLeft, Clock, CheckCircle, XCircle, Send } from 'lucide-react'
import { useRouter } from "next/navigation"

const availableUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Python", "Machine Learning", "Data Science"],
    wantsToLearn: ["JavaScript", "React"],
    rating: 4.8,
    location: "New York, USA"
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Graphic Design", "UI/UX", "Figma"],
    wantsToLearn: ["Web Development", "CSS"],
    rating: 4.9,
    location: "Cairo, Egypt"
  },
  {
    id: 3,
    name: "Maria Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Spanish", "Translation", "Content Writing"],
    wantsToLearn: ["Digital Marketing", "SEO"],
    rating: 4.7,
    location: "Madrid, Spain"
  }
]

const pendingRequests = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    mySkill: "JavaScript",
    theirSkill: "Python",
    status: "pending",
    date: "2024-01-15"
  },
  {
    id: 2,
    user: "Ahmed Hassan",
    avatar: "/placeholder.svg?height=40&width=40",
    mySkill: "React",
    theirSkill: "UI/UX Design",
    status: "accepted",
    date: "2024-01-14"
  }
]

export default function SwapRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const router = useRouter()

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.wantsToLearn.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const sendSwapRequest = (userId: number) => {
    setSelectedUsers([...selectedUsers, userId])
    // Here you would typically send the request to your backend
  }

  const handleAcceptRequest = (requestId: number) => {
    // Accept request logic
    router.push('/quiz')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Skill Swap Requests</h1>
            <p className="mt-2 text-gray-600">Find people to exchange skills with and manage your requests</p>
          </div>

          <Tabs defaultValue="find" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="find">Find Partners</TabsTrigger>
              <TabsTrigger value="requests">My Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="find" className="space-y-6">
              {/* Search */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="h-5 w-5" />
                    <span>Find Skill Partners</span>
                  </CardTitle>
                  <CardDescription>Search for people who want to learn your skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Search by name, skills, or interests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Available Users */}
              <div className="grid gap-6">
                {filteredUsers.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <div>
                              <h3 className="text-lg font-semibold">{user.name}</h3>
                              <p className="text-sm text-gray-600">{user.location}</p>
                              <div className="flex items-center space-x-1 mt-1">
                                <span className="text-yellow-500">★</span>
                                <span className="text-sm font-medium">{user.rating}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <p className="text-sm font-medium text-gray-700">Can teach:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {user.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary">{skill}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700">Wants to learn:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {user.wantsToLearn.map((skill) => (
                                    <Badge key={skill} variant="outline">{skill}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => sendSwapRequest(user.id)}
                          disabled={selectedUsers.includes(user.id)}
                          className="flex items-center space-x-2"
                        >
                          {selectedUsers.includes(user.id) ? (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              <span>Request Sent</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              <span>Send Request</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ArrowRightLeft className="h-5 w-5" />
                    <span>Pending Requests</span>
                  </CardTitle>
                  <CardDescription>Manage your incoming and outgoing swap requests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={request.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{request.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{request.user}</h4>
                          <p className="text-sm text-gray-600">
                            Wants to learn <Badge variant="secondary" className="mx-1">{request.mySkill}</Badge>
                            in exchange for <Badge variant="outline" className="mx-1">{request.theirSkill}</Badge>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {request.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {request.status === 'pending' ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Decline
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleAcceptRequest(request.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                          </>
                        ) : (
                          <Badge variant="secondary" className="text-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Accepted
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, X, User, Star } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js"])
  const [wantToLearn, setWantToLearn] = useState(["Python", "Machine Learning"])
  const [newSkill, setNewSkill] = useState("")
  const [newLearnSkill, setNewLearnSkill] = useState("")
  const router = useRouter()

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const addLearnSkill = () => {
    if (newLearnSkill.trim()) {
      setWantToLearn([...wantToLearn, newLearnSkill.trim()])
      setNewLearnSkill("")
    }
  }

  const removeLearnSkill = (skillToRemove: string) => {
    setWantToLearn(wantToLearn.filter(skill => skill !== skillToRemove))
  }

  const handleSaveProfile = () => {
    // Save profile logic here
    router.push('/swap-requests')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Create Your Skill Profile</h1>
            <p className="mt-2 text-gray-600">Tell others about your skills and what you want to learn</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Photo</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell others about yourself, your experience, and what makes you passionate about your skills..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, Country" />
                </div>
              </CardContent>
            </Card>

            {/* Profile Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Profile Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">Skills Taught</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">Skills Learned</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">5.0</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Skills I Can Teach */}
            <Card>
              <CardHeader>
                <CardTitle>Skills I Can Teach</CardTitle>
                <CardDescription>Add skills you can teach to others</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center space-x-1">
                      <span>{skill}</span>
                      <button onClick={() => removeSkill(skill)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills I Want to Learn */}
            <Card>
              <CardHeader>
                <CardTitle>Skills I Want to Learn</CardTitle>
                <CardDescription>Add skills you want to learn from others</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter a skill"
                    value={newLearnSkill}
                    onChange={(e) => setNewLearnSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addLearnSkill()}
                  />
                  <Button onClick={addLearnSkill} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {wantToLearn.map((skill) => (
                    <Badge key={skill} variant="outline" className="flex items-center space-x-1">
                      <span>{skill}</span>
                      <button onClick={() => removeLearnSkill(skill)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <Button onClick={handleSaveProfile} size="lg" className="px-8">
              Save Profile & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

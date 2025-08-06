"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Users, BookOpen, Clock, Star } from 'lucide-react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      router.push('/profile')
    }, 1000)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false)
      router.push('/profile')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Skill <span className="text-blue-600">Barter</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Exchange your skills with others and learn something new. Connect with people who want to learn what you know, and learn what they excel at.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold">Connect</h3>
                <p className="text-sm text-gray-600">Find skill partners</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <BookOpen className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold">Learn</h3>
                <p className="text-sm text-gray-600">Acquire new skills</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <h3 className="font-semibold">Schedule</h3>
                <p className="text-sm text-gray-600">Flexible timing</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Star className="h-8 w-8 text-yellow-600" />
              <div>
                <h3 className="font-semibold">Rate</h3>
                <p className="text-sm text-gray-600">Give feedback</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login/Signup Form */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to Skill Barter</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" placeholder="Create a password" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

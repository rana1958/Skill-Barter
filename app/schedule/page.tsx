"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Video, MapPin, User } from 'lucide-react'
import { useRouter } from "next/navigation"

const timeSlots = [
  { id: 1, time: "09:00 AM", available: true },
  { id: 2, time: "10:00 AM", available: true },
  { id: 3, time: "11:00 AM", available: false },
  { id: 4, time: "02:00 PM", available: true },
  { id: 5, time: "03:00 PM", available: true },
  { id: 6, time: "04:00 PM", available: true },
  { id: 7, time: "07:00 PM", available: true },
  { id: 8, time: "08:00 PM", available: false },
]

const dates = [
  { id: 1, date: "2024-01-20", day: "Saturday", available: true },
  { id: 2, date: "2024-01-21", day: "Sunday", available: true },
  { id: 3, date: "2024-01-22", day: "Monday", available: true },
  { id: 4, date: "2024-01-23", day: "Tuesday", available: false },
  { id: 5, date: "2024-01-24", day: "Wednesday", available: true },
  { id: 6, date: "2024-01-25", day: "Thursday", available: true },
  { id: 7, date: "2024-01-26", day: "Friday", available: true },
]

const sessionTypes = [
  {
    id: 1,
    type: "Video Call",
    icon: Video,
    description: "Online session via video call",
    duration: "1 hour",
    popular: true
  },
  {
    id: 2,
    type: "In-Person",
    icon: MapPin,
    description: "Meet in person at a agreed location",
    duration: "1-2 hours",
    popular: false
  },
  {
    id: 3,
    type: "Workshop Style",
    icon: User,
    description: "Intensive hands-on session",
    duration: "2-3 hours",
    popular: false
  }
]

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<number | null>(null)
  const [selectedSessionType, setSelectedSessionType] = useState<number | null>(1)
  const [selectedSkill, setSelectedSkill] = useState<'javascript' | 'python'>('javascript')
  const router = useRouter()

  const handleScheduleSession = () => {
    if (selectedDate && selectedTime && selectedSessionType) {
      // Schedule the session
      router.push('/feedback')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Schedule Your Sessions</h1>
            <p className="mt-2 text-gray-600">Plan your skill exchange sessions with Sarah Johnson</p>
          </div>

          {/* Partner Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                  <p className="text-gray-600">New York, USA • ⭐ 4.8 rating</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant="secondary">Teaching: Python</Badge>
                    <Badge variant="outline">Learning: JavaScript</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Session Planning */}
            <div className="space-y-6">
              {/* Skill Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Choose Session Focus</CardTitle>
                  <CardDescription>Select which skill to focus on first</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <button
                      onClick={() => setSelectedSkill('javascript')}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        selectedSkill === 'javascript' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h4 className="font-semibold">JavaScript Session</h4>
                      <p className="text-sm text-gray-600">You teach JavaScript to Sarah</p>
                    </button>
                    <button
                      onClick={() => setSelectedSkill('python')}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        selectedSkill === 'python' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h4 className="font-semibold">Python Session</h4>
                      <p className="text-sm text-gray-600">Sarah teaches Python to you</p>
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Session Type */}
              <Card>
                <CardHeader>
                  <CardTitle>Session Type</CardTitle>
                  <CardDescription>Choose how you'd like to conduct the session</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sessionTypes.map((session) => {
                    const Icon = session.icon
                    return (
                      <button
                        key={session.id}
                        onClick={() => setSelectedSessionType(session.id)}
                        className={`w-full p-4 border rounded-lg text-left transition-colors ${
                          selectedSessionType === session.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className="h-5 w-5 mt-0.5 text-blue-600" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold">{session.type}</h4>
                              {session.popular && (
                                <Badge variant="secondary" className="text-xs">Popular</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{session.description}</p>
                            <p className="text-xs text-gray-500 mt-1">Duration: {session.duration}</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Date and Time Selection */}
            <div className="space-y-6">
              {/* Date Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Select Date</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {dates.map((date) => (
                      <button
                        key={date.id}
                        onClick={() => date.available && setSelectedDate(date.id)}
                        disabled={!date.available}
                        className={`p-3 border rounded-lg text-left transition-colors ${
                          selectedDate === date.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : date.available 
                              ? 'border-gray-200 hover:border-gray-300' 
                              : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{date.day}</p>
                            <p className="text-sm text-gray-600">{date.date}</p>
                          </div>
                          {!date.available && (
                            <Badge variant="secondary" className="text-xs">Unavailable</Badge>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Time Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Select Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => slot.available && setSelectedTime(slot.id)}
                        disabled={!slot.available || !selectedDate}
                        className={`p-3 border rounded-lg text-center transition-colors ${
                          selectedTime === slot.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : slot.available && selectedDate
                              ? 'border-gray-200 hover:border-gray-300' 
                              : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <p className="font-medium">{slot.time}</p>
                        {!slot.available && (
                          <p className="text-xs text-red-500">Booked</p>
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Schedule Summary */}
          {selectedDate && selectedTime && selectedSessionType && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Session Summary</CardTitle>
              </CardHeader>
              <CardContent className="text-green-700">
                <div className="space-y-2">
                  <p><strong>Skill:</strong> {selectedSkill === 'javascript' ? 'JavaScript (You teaching)' : 'Python (Sarah teaching)'}</p>
                  <p><strong>Type:</strong> {sessionTypes.find(s => s.id === selectedSessionType)?.type}</p>
                  <p><strong>Date:</strong> {dates.find(d => d.id === selectedDate)?.day}, {dates.find(d => d.id === selectedDate)?.date}</p>
                  <p><strong>Time:</strong> {timeSlots.find(t => t.id === selectedTime)?.time}</p>
                  <p><strong>Duration:</strong> {sessionTypes.find(s => s.id === selectedSessionType)?.duration}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Schedule Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleScheduleSession}
              disabled={!selectedDate || !selectedTime || !selectedSessionType}
              size="lg"
              className="px-8"
            >
              Schedule Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MessageSquare, ThumbsUp, Award, Calendar } from 'lucide-react'
import { useRouter } from "next/navigation"

const completedSessions = [
  {
    id: 1,
    partner: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    skill: "Python Basics",
    date: "2024-01-20",
    duration: "1 hour",
    type: "Video Call",
    status: "completed",
    myRating: 0,
    feedback: ""
  },
  {
    id: 2,
    partner: "Ahmed Hassan",
    avatar: "/placeholder.svg?height=40&width=40",
    skill: "UI/UX Design",
    date: "2024-01-18",
    duration: "2 hours",
    type: "In-Person",
    status: "completed",
    myRating: 5,
    feedback: "Ahmed was an excellent teacher! Very patient and explained concepts clearly."
  }
]

const receivedFeedback = [
  {
    id: 1,
    partner: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    skill: "JavaScript",
    rating: 5,
    feedback: "Excellent teacher! Very clear explanations and great examples. Would definitely recommend!",
    date: "2024-01-20"
  },
  {
    id: 2,
    partner: "Ahmed Hassan",
    avatar: "/placeholder.svg?height=40&width=40",
    skill: "React",
    rating: 4,
    feedback: "Good session, learned a lot about React components. Could use more practical examples.",
    date: "2024-01-18"
  }
]

export default function FeedbackPage() {
  const [ratings, setRatings] = useState<{[key: number]: number}>({})
  const [feedbacks, setFeedbacks] = useState<{[key: number]: string}>({})
  const router = useRouter()

  const handleRatingChange = (sessionId: number, rating: number) => {
    setRatings({
      ...ratings,
      [sessionId]: rating
    })
  }

  const handleFeedbackChange = (sessionId: number, feedback: string) => {
    setFeedbacks({
      ...feedbacks,
      [sessionId]: feedback
    })
  }

  const submitFeedback = (sessionId: number) => {
    // Submit feedback logic here
    console.log(`Submitting feedback for session ${sessionId}:`, {
      rating: ratings[sessionId],
      feedback: feedbacks[sessionId]
    })
  }

  const StarRating = ({ rating, onRatingChange, readonly = false }: { 
    rating: number, 
    onRatingChange?: (rating: number) => void,
    readonly?: boolean 
  }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => !readonly && onRatingChange && onRatingChange(star)}
            disabled={readonly}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Feedback & Reviews</h1>
            <p className="mt-2 text-gray-600">Share your experience and see what others think</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">4.8</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-sm text-gray-600">Sessions Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <ThumbsUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-sm text-gray-600">Skills Taught</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">15</div>
                <div className="text-sm text-gray-600">Reviews Given</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Give Feedback */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Give Feedback</span>
                  </CardTitle>
                  <CardDescription>Rate your recent sessions and help others</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {completedSessions.map((session) => (
                    <div key={session.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={session.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{session.partner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold">{session.partner}</h4>
                          <p className="text-sm text-gray-600">{session.skill}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                            <span>{session.date}</span>
                            <span>{session.duration}</span>
                            <Badge variant="outline" className="text-xs">{session.type}</Badge>
                          </div>
                        </div>
                      </div>

                      {session.myRating === 0 ? (
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                              Rate this session:
                            </label>
                            <StarRating
                              rating={ratings[session.id] || 0}
                              onRatingChange={(rating) => handleRatingChange(session.id, rating)}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                              Your feedback:
                            </label>
                            <Textarea
                              placeholder="Share your experience with this session..."
                              value={feedbacks[session.id] || ''}
                              onChange={(e) => handleFeedbackChange(session.id, e.target.value)}
                              className="min-h-[80px]"
                            />
                          </div>
                          <Button
                            onClick={() => submitFeedback(session.id)}
                            disabled={!ratings[session.id]}
                            size="sm"
                          >
                            Submit Feedback
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2 bg-green-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <StarRating rating={session.myRating} readonly />
                            <Badge variant="secondary" className="text-green-700">Feedback Submitted</Badge>
                          </div>
                          <p className="text-sm text-gray-700">{session.feedback}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Received Feedback */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>Feedback Received</span>
                  </CardTitle>
                  <CardDescription>See what others think about your teaching</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {receivedFeedback.map((feedback) => (
                    <div key={feedback.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={feedback.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{feedback.partner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{feedback.partner}</h4>
                            <span className="text-xs text-gray-500">{feedback.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Session: {feedback.skill}</p>
                          <StarRating rating={feedback.rating} readonly />
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        "{feedback.feedback}"
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/swap-requests')}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Find New Partners
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/schedule')}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule More Sessions
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/profile')}
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Success Message */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-green-800 mb-2">
                <Award className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Congratulations!</h3>
              </div>
              <p className="text-green-700">
                You've successfully completed the skill barter process. Keep learning and teaching to build your reputation in the community!
              </p>
              <div className="mt-4">
                <Button onClick={() => router.push('/swap-requests')} className="bg-green-600 hover:bg-green-700">
                  Start Another Exchange
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

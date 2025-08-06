"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, CheckCircle, User } from 'lucide-react'
import { useRouter } from "next/navigation"

const quizData = {
  mySkill: "JavaScript",
  theirSkill: "Python",
  partner: "Sarah Johnson",
  questions: [
    {
      id: 1,
      question: "What is the correct way to declare a variable in JavaScript?",
      options: [
        "var myVariable = 5;",
        "variable myVariable = 5;",
        "v myVariable = 5;",
        "declare myVariable = 5;"
      ],
      correct: 0
    },
    {
      id: 2,
      question: "Which method is used to add an element to the end of an array?",
      options: [
        "append()",
        "push()",
        "add()",
        "insert()"
      ],
      correct: 1
    },
    {
      id: 3,
      question: "What does DOM stand for?",
      options: [
        "Document Object Model",
        "Data Object Management",
        "Dynamic Object Method",
        "Document Oriented Model"
      ],
      correct: 0
    }
  ]
}

const partnerQuizData = {
  questions: [
    {
      id: 1,
      question: "What is Python primarily used for?",
      options: [
        "Only web development",
        "Data science, AI, web development, and more",
        "Only mobile app development",
        "Only game development"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Which of the following is the correct way to create a list in Python?",
      options: [
        "list = {1, 2, 3}",
        "list = (1, 2, 3)",
        "list = [1, 2, 3]",
        "list = <1, 2, 3>"
      ],
      correct: 2
    }
  ]
}

export default function QuizPage() {
  const [currentQuiz, setCurrentQuiz] = useState<'my' | 'partner'>('my')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: number}>({})
  const [myQuizCompleted, setMyQuizCompleted] = useState(false)
  const [partnerQuizCompleted, setPartnerQuizCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()

  const currentQuizData = currentQuiz === 'my' ? quizData : partnerQuizData
  const questions = currentQuizData.questions
  const totalQuestions = questions.length

  const handleAnswerSelect = (answerIndex: number) => {
    const key = `${currentQuiz}-${currentQuestion}`
    setSelectedAnswers({
      ...selectedAnswers,
      [key]: answerIndex
    })
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz completed
      if (currentQuiz === 'my') {
        setMyQuizCompleted(true)
        setCurrentQuiz('partner')
        setCurrentQuestion(0)
      } else {
        setPartnerQuizCompleted(true)
        setShowResults(true)
      }
    }
  }

  const calculateScore = (quiz: 'my' | 'partner') => {
    const quizQuestions = quiz === 'my' ? quizData.questions : partnerQuizData.questions
    let correct = 0
    quizQuestions.forEach((q, index) => {
      const key = `${quiz}-${index}`
      if (selectedAnswers[key] === q.correct) {
        correct++
      }
    })
    return Math.round((correct / quizQuestions.length) * 100)
  }

  const handleContinue = () => {
    router.push('/schedule')
  }

  if (showResults) {
    const myScore = calculateScore('my')
    const partnerScore = calculateScore('partner')
    
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span>Quiz Results</span>
              </CardTitle>
              <CardDescription>Both quizzes have been completed successfully!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Your JavaScript Quiz</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{myScore}%</div>
                  <Badge variant={myScore >= 70 ? "default" : "secondary"}>
                    {myScore >= 70 ? "Passed" : "Needs Improvement"}
                  </Badge>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Your Python Quiz</h3>
                  <div className="text-3xl font-bold text-green-600 mb-2">{partnerScore}%</div>
                  <Badge variant={partnerScore >= 70 ? "default" : "secondary"}>
                    {partnerScore >= 70 ? "Passed" : "Needs Improvement"}
                  </Badge>
                </div>
              </div>
              
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  Great job! You and Sarah can now proceed to schedule your skill exchange sessions.
                  Both of you have demonstrated sufficient knowledge to begin teaching each other.
                </p>
              </div>

              <div className="flex justify-center">
                <Button onClick={handleContinue} size="lg" className="px-8">
                  Continue to Scheduling
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / totalQuestions) * 100
  const currentQuestionData = questions[currentQuestion]
  const selectedAnswer = selectedAnswers[`${currentQuiz}-${currentQuestion}`]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Skill Assessment Quiz</h1>
            <p className="mt-2 text-gray-600">
              Test your knowledge before starting the skill exchange
            </p>
          </div>

          {/* Quiz Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className={currentQuiz === 'my' ? 'ring-2 ring-blue-500' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${myQuizCompleted ? 'bg-green-100' : currentQuiz === 'my' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {myQuizCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Brain className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">JavaScript Quiz</h3>
                    <p className="text-sm text-gray-600">Test your JavaScript knowledge</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={currentQuiz === 'partner' ? 'ring-2 ring-blue-500' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${partnerQuizCompleted ? 'bg-green-100' : currentQuiz === 'partner' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {partnerQuizCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <User className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">Python Quiz</h3>
                    <p className="text-sm text-gray-600">Test your Python knowledge</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Quiz */}
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>
                    {currentQuiz === 'my' ? 'JavaScript' : 'Python'} Quiz
                  </span>
                </CardTitle>
                <Badge variant="outline">
                  Question {currentQuestion + 1} of {totalQuestions}
                </Badge>
              </div>
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-gray-600">{Math.round(progress)}% Complete</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {currentQuestionData.question}
                </h3>
                <RadioGroup
                  value={selectedAnswer?.toString()}
                  onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                >
                  {currentQuestionData.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  disabled={currentQuestion === 0 && currentQuiz === 'my'}
                  onClick={() => {
                    if (currentQuestion > 0) {
                      setCurrentQuestion(currentQuestion - 1)
                    } else if (currentQuiz === 'partner') {
                      setCurrentQuiz('my')
                      setCurrentQuestion(quizData.questions.length - 1)
                    }
                  }}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswer === undefined}
                >
                  {currentQuestion === totalQuestions - 1 
                    ? (currentQuiz === 'my' ? 'Start Python Quiz' : 'Finish Quiz')
                    : 'Next Question'
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

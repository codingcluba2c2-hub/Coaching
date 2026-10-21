"use client";

import React, { useState } from "react";
import {
  FileSpreadsheet,
  Plus,
  Play,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  RotateCcw,
} from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatDate } from "@/lib/utils";
import { INITIAL_EXAMS, QUIZ_QUESTIONS } from "@/lib/demo-data";

export default function ExamsAndQuizzesPage() {
  const [activeTab, setActiveTab] = useState<"exams" | "quiz_practice" | "question_bank">("exams");
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  // Interactive Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score += 4;
      } else if (selectedAnswers[idx] !== undefined) {
        score -= 1; // Standard negative marking
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setQuizSubmitted(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Exams & Online Quizzes</h2>
          <p className="text-xs text-slate-500">
            Schedule offline & CBT tests, build question banks, and run live interactive practice quizzes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setIsQuizModalOpen(true)}>
            <Play className="h-4 w-4" /> Launch Interactive Quiz Preview
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-medium">
        <button
          onClick={() => setActiveTab("exams")}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === "exams"
              ? "bg-blue-900 text-white font-semibold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Scheduled Tests ({INITIAL_EXAMS.length})
        </button>
        <button
          onClick={() => setActiveTab("question_bank")}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === "question_bank"
              ? "bg-blue-900 text-white font-semibold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Question Bank Repository ({QUIZ_QUESTIONS.length})
        </button>
      </div>

      {/* Scheduled Exams View */}
      {activeTab === "exams" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_EXAMS.map((exam) => (
            <Card key={exam.id} className="hover:border-blue-300 transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant={
                      exam.status === "Ongoing"
                        ? "warning"
                        : exam.status === "Scheduled"
                        ? "info"
                        : "success"
                    }
                  >
                    {exam.status}
                  </Badge>
                  <span className="text-xs text-slate-400">{formatDate(exam.date)}</span>
                </div>
                <CardTitle className="text-base">{exam.title}</CardTitle>
                <CardDescription>{exam.courseName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400">Duration:</span>
                    <p className="font-semibold text-slate-800">{exam.durationMinutes} Mins</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Total Marks:</span>
                    <p className="font-semibold text-slate-800">{exam.totalMarks} Marks</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Highest Score:</span>
                    <p className="font-bold text-emerald-600">{exam.highestScore || "Pending"}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Batch Average:</span>
                    <p className="font-bold text-blue-600">{exam.averageScore || "Pending"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-slate-500">Passing: {exam.passingMarks}</span>
                  <Button variant="outline" size="sm" onClick={() => setIsQuizModalOpen(true)}>
                    Preview CBT
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Question Bank View */}
      {activeTab === "question_bank" && (
        <div className="space-y-4">
          {QUIZ_QUESTIONS.map((q, idx) => (
            <Card key={q.id}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      Q{idx + 1}
                    </span>
                    <Badge variant="outline">{q.subject}</Badge>
                    <Badge
                      variant={
                        q.difficulty === "Easy"
                          ? "success"
                          : q.difficulty === "Medium"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {q.difficulty}
                    </Badge>
                  </div>
                </div>

                <p className="font-medium text-xs text-slate-900 leading-relaxed">
                  {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`p-2.5 rounded-lg border text-slate-800 ${
                        optIdx === q.correctAnswer
                          ? "border-emerald-300 bg-emerald-50/50 font-medium"
                          : "border-slate-200 bg-slate-50/50"
                      }`}
                    >
                      <span className="font-bold mr-1.5 text-slate-500">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      {opt}
                      {optIdx === q.correctAnswer && (
                        <span className="text-[10px] text-emerald-700 ml-2 font-bold">
                          ✓ Correct Key
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Interactive Quiz Preview Modal */}
      <Modal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        title="Interactive CBT Quiz Simulator"
        description="Frontend evaluation demo with real-time scoring and negative marking."
        maxWidth="xl"
      >
        <div className="space-y-4 text-xs">
          {!quizSubmitted ? (
            <div>
              {/* Question Navigation indicator */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="font-bold text-slate-700">
                  Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-slate-500 flex items-center gap-1 font-mono">
                  <Clock className="h-3.5 w-3.5 text-blue-600" /> Untimed Demo Session
                </span>
              </div>

              {/* Current Question */}
              <div className="py-4 space-y-3">
                <Badge variant="info">
                  {QUIZ_QUESTIONS[currentQuestionIndex].subject}
                </Badge>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                  {QUIZ_QUESTIONS[currentQuestionIndex].question}
                </p>

                <div className="space-y-2 pt-2">
                  {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                        className={`w-full text-left p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/80 font-semibold text-blue-900 ring-1 ring-blue-600"
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-5 w-5 rounded-full border border-slate-300 flex items-center justify-center font-bold text-[10px]">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{option}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prev / Next / Submit Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? (
                    <Button
                      size="sm"
                      onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    >
                      Next Question
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => setQuizSubmitted(true)}
                    >
                      Submit Exam
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-4">
              <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Quiz Completed!</h3>
              <p className="text-xs text-slate-500">
                Calculated using standard competitive scheme (+4 for correct, -1 for incorrect).
              </p>

              <div className="inline-block bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center shadow-xs">
                <p className="text-xs text-slate-500">Final Calculated Score</p>
                <p className="text-3xl font-extrabold text-blue-900 mt-1">
                  {calculateScore()} / {QUIZ_QUESTIONS.length * 4}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Attempted: {Object.keys(selectedAnswers).length} of {QUIZ_QUESTIONS.length}
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <Button variant="outline" size="sm" onClick={handleResetQuiz}>
                  <RotateCcw className="h-3.5 w-3.5" /> Retake Test
                </Button>
                <Button size="sm" onClick={() => setIsQuizModalOpen(false)}>
                  Close Simulator
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

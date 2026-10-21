"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  CheckCircle,
  CreditCard,
  FolderOpen,
  Video,
  FileSpreadsheet,
  Clock,
  ArrowRight,
  Download,
  AlertCircle,
  PlayCircle,
} from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { STUDY_MATERIALS, ASSIGNMENTS, LIVE_CLASSES, INITIAL_EXAMS } from "@/lib/demo-data";

export default function StudentPortalPage() {
  const { students, activeInstitute, addNotification } = useDemo();
  // Fixed demo student profile
  const student = students[0]; // Aarav Sharma

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "courses" | "timetable" | "attendance" | "fees" | "exams" | "materials" | "live"
  >("dashboard");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Student Portal Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-600/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">Student Learning Portal</h1>
            <p className="text-[11px] text-slate-500">{activeInstitute.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="text-xs">
              Switch to Institute Admin View
            </Button>
          </Link>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="h-8 w-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
              {student.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-left text-xs">
              <p className="font-bold text-slate-800 leading-none">{student.name}</p>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">{student.rollNumber}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Student Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <Badge variant="outline" className="text-emerald-200 border-emerald-400/40 mb-2">
              Student Dashboard • {student.courseName}
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold">Hello, {student.name}!</h2>
            <p className="text-xs text-emerald-100/90 mt-1">
              Your next class is today at 04:30 PM ({student.batchName}).
            </p>
          </div>
          <div className="flex items-center gap-3 bg-emerald-950/40 p-3 rounded-xl border border-emerald-700/50 text-xs">
            <div>
              <p className="text-emerald-300">Attendance Rate</p>
              <p className="text-lg font-bold">{student.attendancePercentage}%</p>
            </div>
            <div className="pl-3 border-l border-emerald-700/50">
              <p className="text-emerald-300">Outstanding Dues</p>
              <p className="text-lg font-bold text-emerald-100">{formatCurrency(student.fees.pending)}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-semibold">
          {[
            { id: "dashboard", label: "My Hub" },
            { id: "attendance", label: "Attendance Summary" },
            { id: "fees", label: "Tuition & Receipts" },
            { id: "materials", label: "Study Materials" },
            { id: "exams", label: "Exam Test Papers" },
            { id: "live", label: "Live Virtual Sessions" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg shrink-0 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Student Hub View */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Homework / Assignments */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Homework & Problem Sets</CardTitle>
                  <CardDescription>Tasks requiring submission before deadline</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {ASSIGNMENTS.map((asg) => (
                    <div
                      key={asg.id}
                      className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs hover:border-emerald-300 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">{asg.title}</span>
                          <Badge variant="outline">{asg.subject}</Badge>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          Due by: <strong>{formatDate(asg.dueDate)}</strong> • Total marks: {asg.totalMarks}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addNotification(`Assignment "${asg.title}" submission window opened (Demo)`)}
                      >
                        Submit Work
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Materials */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Lecture Slides & Formulas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {STUDY_MATERIALS.map((mat) => (
                    <div
                      key={mat.id}
                      className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-semibold text-slate-800">{mat.title}</p>
                        <p className="text-[11px] text-slate-400">
                          {mat.subject} • {mat.type} ({mat.sizeOrDuration})
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => addNotification(`Downloaded ${mat.title}`)}
                      >
                        <Download className="h-4 w-4" /> Download
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Live Class Box */}
            <div className="space-y-6">
              <Card className="border-emerald-200 bg-emerald-50/30">
                <CardHeader>
                  <CardTitle className="text-emerald-950 flex items-center gap-2">
                    <Video className="h-4 w-4 text-emerald-700" /> Upcoming Class
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{LIVE_CLASSES[0]?.title}</p>
                    <p className="text-slate-600 mt-1">Instructor: {LIVE_CLASSES[0]?.instructor}</p>
                    <p className="text-emerald-800 font-semibold mt-1">
                      Time: {LIVE_CLASSES[0]?.scheduledTime}
                    </p>
                  </div>
                  <a
                    href={LIVE_CLASSES[0]?.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block pt-2"
                  >
                    <Button size="sm" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
                      <PlayCircle className="h-4 w-4" /> Join Virtual Lecture
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Fee Reminder Widget */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xs">Fee Installment Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Billed:</span>
                    <span className="font-semibold">{formatCurrency(student.fees.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Paid to Date:</span>
                    <span className="font-bold text-emerald-700">{formatCurrency(student.fees.paid)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100">
                    <span className="text-slate-500">Outstanding:</span>
                    <span className="font-bold text-rose-600">{formatCurrency(student.fees.pending)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Tab Views */}
        {activeTab === "attendance" && (
          <Card>
            <CardHeader>
              <CardTitle>My Attendance Records</CardTitle>
              <CardDescription>Your current cumulative attendance is {student.attendancePercentage}%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-slate-100 text-xs">
                {[
                  { date: "2024-10-18", status: "Present", topic: "Rotational Mechanics — Conservation of Angular Momentum" },
                  { date: "2024-10-16", status: "Present", topic: "Moment of Inertia Theorems & Proofs" },
                  { date: "2024-10-14", status: "Late", topic: "Torque Equilibrium Conditions" },
                  { date: "2024-10-11", status: "Present", topic: "Problem Solving Clinic 04" },
                ].map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800">{item.topic}</p>
                      <p className="text-[11px] text-slate-400">{formatDate(item.date)}</p>
                    </div>
                    <Badge variant={item.status === "Present" ? "success" : "warning"}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "fees" && (
          <Card>
            <CardHeader>
              <CardTitle>My Fee Ledger & Receipts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-slate-500">Total Program Fee</span>
                    <p className="text-base font-bold text-slate-900">{formatCurrency(student.fees.total)}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Paid Amount</span>
                    <p className="text-base font-bold text-emerald-700">{formatCurrency(student.fees.paid)}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Current Balance Due</span>
                    <p className="text-base font-bold text-rose-600">{formatCurrency(student.fees.pending)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "materials" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STUDY_MATERIALS.map((mat) => (
              <Card key={mat.id}>
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-2">{mat.subject}</Badge>
                  <CardTitle className="text-sm font-semibold">{mat.title}</CardTitle>
                  <CardDescription>{mat.type} • {mat.sizeOrDuration}</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => addNotification(`Downloaded ${mat.title}`)}
                  >
                    <Download className="h-3.5 w-3.5" /> Download Note
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "exams" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_EXAMS.map((exam) => (
              <Card key={exam.id}>
                <CardHeader className="pb-2">
                  <Badge variant="info" className="mb-2">{exam.status}</Badge>
                  <CardTitle className="text-sm font-semibold">{exam.title}</CardTitle>
                  <CardDescription>{formatDate(exam.date)} • {exam.durationMinutes} mins</CardDescription>
                </CardHeader>
                <CardContent className="pt-2 text-xs">
                  <p className="text-slate-500">Max marks: {exam.totalMarks} • Pass marks: {exam.passingMarks}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "live" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LIVE_CLASSES.map((cls) => (
              <Card key={cls.id}>
                <CardHeader className="pb-2">
                  <Badge variant={cls.status === "Live" ? "danger" : "info"} className="mb-2">
                    {cls.status}
                  </Badge>
                  <CardTitle className="text-base">{cls.title}</CardTitle>
                  <CardDescription>{cls.scheduledTime}</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-xs text-slate-600 mb-3">Faculty: {cls.instructor}</p>
                  <a href={cls.meetingLink} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800 text-white">
                      <PlayCircle className="h-4 w-4" /> Open Virtual Room
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

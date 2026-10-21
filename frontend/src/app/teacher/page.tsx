"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  Calendar,
  CheckSquare,
  FileSpreadsheet,
  FolderOpen,
  Video,
  Plus,
  Clock,
  ArrowRight,
  Upload,
} from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { INITIAL_TEACHERS, ASSIGNMENTS, INITIAL_EXAMS } from "@/lib/demo-data";

export default function TeacherPortalPage() {
  const { batches, activeInstitute, addNotification } = useDemo();
  const teacher = INITIAL_TEACHERS[0]; // Dr. Arvind Mehta

  // Filter batches assigned to this instructor
  const myBatches = batches.filter((b) => b.teacherName.includes("Arvind"));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-amber-600 flex items-center justify-center text-white font-bold shadow-md shadow-amber-600/20">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">Faculty & Educator Portal</h1>
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
            <div className="h-8 w-8 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-xs">
              AM
            </div>
            <div className="hidden sm:block text-left text-xs">
              <p className="font-bold text-slate-800 leading-none">{teacher.name}</p>
              <p className="text-[10px] text-slate-500">{teacher.designation}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Educator Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <Badge variant="outline" className="text-amber-200 border-amber-400/40 mb-2">
              Faculty Workspace • {teacher.subject}
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold">Welcome back, {teacher.name}</h2>
            <p className="text-xs text-amber-100/90 mt-1">
              You have 2 lectures scheduled today. Alpha Batch attendance is awaiting mark submission.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/attendance">
              <Button size="sm" className="bg-white text-amber-900 hover:bg-amber-50 border-0">
                <CheckSquare className="h-4 w-4" /> Open Attendance Register
              </Button>
            </Link>
          </div>
        </div>

        {/* My Batches Grid */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-800">My Assigned Batches</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myBatches.map((batch) => (
              <Card key={batch.id} className="hover:border-amber-400 transition-all">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div>
                    <CardTitle className="text-base">{batch.name}</CardTitle>
                    <CardDescription>{batch.courseName}</CardDescription>
                  </div>
                  <Badge variant="info">{batch.enrolled} Students</Badge>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="flex items-center justify-between text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-amber-600" /> {batch.timing}
                    </span>
                    <span>Room: {batch.room}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-slate-500">Days: {batch.schedule}</span>
                    <Link href="/dashboard/attendance">
                      <Button size="sm" variant="outline" className="text-xs">
                        Mark Attendance
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Widgets Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Homework Grader */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Assignments & Submissions</CardTitle>
                <CardDescription>Homework awaiting evaluation</CardDescription>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => addNotification("New assignment creation dialog (Simulated)")}
              >
                <Plus className="h-4 w-4" /> New Assignment
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {ASSIGNMENTS.map((asg) => (
                <div key={asg.id} className="p-3 rounded-lg border border-slate-100 text-xs">
                  <div className="flex justify-between font-semibold text-slate-900">
                    <span>{asg.title}</span>
                    <Badge variant="success">{asg.submissionsCount} Submissions</Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{asg.batchName}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Upload Material */}
          <Card>
            <CardHeader>
              <CardTitle>Distribute Lecture Notes</CardTitle>
              <CardDescription>Upload notes directly to assigned student batches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <p className="text-slate-600">
                Share reference formula sheets or problem set keys instantly across your classroom batches.
              </p>
              <Link href="/dashboard/materials">
                <Button size="sm" className="bg-amber-700 hover:bg-amber-800 text-white">
                  <Upload className="h-4 w-4" /> Upload Material
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

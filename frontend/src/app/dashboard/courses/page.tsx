"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Users,
  Clock,
  Calendar,
  Layers,
  Plus,
  CheckCircle2,
  AlertCircle,
  Building,
} from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { INITIAL_TEACHERS } from "@/lib/demo-data";

export default function CoursesAndBatchesPage() {
  const { courses, batches } = useDemo();
  const [activeTab, setActiveTab] = useState<"courses" | "batches" | "faculty">("courses");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Academic Programs & Batches</h2>
          <p className="text-xs text-slate-500">
            Configure curriculum courses, intake capacities, assigned faculty, and classroom allocations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">
            <Plus className="h-4 w-4" /> Add Program
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-medium">
        <button
          onClick={() => setActiveTab("courses")}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === "courses"
              ? "bg-blue-900 text-white font-semibold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Programs & Courses ({courses.length})
        </button>
        <button
          onClick={() => setActiveTab("batches")}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === "batches"
              ? "bg-blue-900 text-white font-semibold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Active Batches ({batches.length})
        </button>
        <button
          onClick={() => setActiveTab("faculty")}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === "faculty"
              ? "bg-blue-900 text-white font-semibold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Faculty Directory ({INITIAL_TEACHERS.length})
        </button>
      </div>

      {/* Courses View */}
      {activeTab === "courses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:border-blue-300 transition-all">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <Badge variant="info" className="mb-2">{course.category}</Badge>
                  <CardTitle className="text-base">{course.name}</CardTitle>
                  <CardDescription>Code: {course.code} • Duration: {course.duration}</CardDescription>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-slate-900">{formatCurrency(course.totalFee)}</span>
                  <p className="text-[10px] text-slate-400">Total Tuition</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">{course.description}</p>
                
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
                  <p className="font-semibold text-slate-700 mb-1">Key Curriculum Pillars:</p>
                  <ul className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 list-disc list-inside">
                    {course.syllabus.map((s, idx) => (
                      <li key={idx} className="truncate">{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-500">
                  <span>Lead: <strong>{course.assignedFaculty}</strong></span>
                  <span>{course.batchCount} Active Batches • {course.enrolledStudentsCount} Students</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Batches View */}
      {activeTab === "batches" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {batches.map((batch) => {
            const occupancyPct = Math.round((batch.enrolled / batch.capacity) * 100);
            return (
              <Card key={batch.id} className="hover:border-blue-300 transition-all">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div>
                    <CardTitle className="text-base">{batch.name}</CardTitle>
                    <CardDescription>{batch.courseName}</CardDescription>
                  </div>
                  <Badge variant={batch.status === "Active" ? "success" : "default"}>
                    {batch.status}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="h-3.5 w-3.5 text-blue-600" />
                      <span>{batch.timing}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Calendar className="h-3.5 w-3.5 text-indigo-600" />
                      <span>{batch.schedule}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Building className="h-3.5 w-3.5 text-slate-500" />
                      <span>{batch.room}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Users className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Faculty: {batch.teacherName}</span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="pt-2">
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Occupancy: {batch.enrolled} / {batch.capacity} Students</span>
                      <span className="font-semibold text-slate-700">{occupancyPct}% Full</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          occupancyPct >= 90 ? "bg-amber-500" : "bg-blue-600"
                        }`}
                        style={{ width: `${occupancyPct}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Faculty Directory View */}
      {activeTab === "faculty" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_TEACHERS.map((teacher) => (
            <Card key={teacher.id}>
              <CardContent className="p-5 text-center">
                <div className="h-16 w-16 rounded-full bg-blue-900 text-white mx-auto flex items-center justify-center font-bold text-lg mb-3 shadow-md">
                  {teacher.name.split(" ")[1]?.charAt(0) || "T"}
                </div>
                <h3 className="font-bold text-sm text-slate-900">{teacher.name}</h3>
                <p className="text-xs text-blue-600 font-medium">{teacher.designation}</p>
                <p className="text-xs text-slate-500 mt-1">{teacher.subject}</p>
                <Badge variant="outline" className="mt-2">{teacher.experience}</Badge>

                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 text-xs text-slate-600">
                  <div>
                    <p className="text-slate-400">Batches</p>
                    <p className="font-bold text-slate-900">{teacher.activeBatchesCount}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Student Rating</p>
                    <p className="font-bold text-amber-600">★ {teacher.rating}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

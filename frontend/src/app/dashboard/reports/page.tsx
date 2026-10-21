"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  PieChart as PieChartIcon,
  Filter,
} from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, exportToCSV } from "@/lib/utils";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const ATTENDANCE_BREAKDOWN = [
  { name: "> 90% Attendance (Excellent)", value: 42, color: "#10b981" },
  { name: "75% - 90% Attendance (Regular)", value: 18, color: "#3b82f6" },
  { name: "< 75% Attendance (Critical)", value: 5, color: "#ef4444" },
];

export default function ReportsAndAnalyticsPage() {
  const { students, courses, transactions } = useDemo();
  const [selectedRange, setSelectedRange] = useState("CURRENT_ACADEMIC_YEAR");

  const courseEnrollmentData = courses.map((c) => ({
    name: c.name.split(" ")[0] + "...",
    fullName: c.name,
    enrolled: c.enrolledStudentsCount,
    revenue: c.totalFee * c.enrolledStudentsCount,
  }));

  const handleExportSummaryCSV = () => {
    const rows = courses.map((c) => ({
      Course: c.name,
      Category: c.category,
      "Tuition Fee": c.totalFee,
      "Enrolled Count": c.enrolledStudentsCount,
      "Total Revenue Potential": c.totalFee * c.enrolledStudentsCount,
    }));
    exportToCSV("Institute_Analytics_Summary", rows);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Executive Reports & Intelligence</h2>
          <p className="text-xs text-slate-500">
            Audit enrollment distribution, attendance consistency, fee collection realization, and capacity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportSummaryCSV}>
            <Download className="h-4 w-4" /> Export Report (CSV)
          </Button>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Enrollment Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Distribution by Course</CardTitle>
            <CardDescription>Active enrolled students per academic track</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseEnrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="enrolled" name="Enrolled Students" fill="#1e3a8a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Consistency Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Health Segmentation</CardTitle>
            <CardDescription>Student compliance distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ATTENDANCE_BREAKDOWN}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ATTENDANCE_BREAKDOWN.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Health Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Realization by Academic Track</CardTitle>
          <CardDescription>Aggregate billing vs outstanding fees</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                <th className="py-3 px-4">Program Track</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Enrolled Students</th>
                <th className="py-3 px-4">Unit Fee</th>
                <th className="py-3 px-4">Gross Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-semibold text-slate-800">{course.name}</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline">{course.category}</Badge>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700">
                    {course.enrolledStudentsCount} students
                  </td>
                  <td className="py-3 px-4">{formatCurrency(course.totalFee)}</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">
                    {formatCurrency(course.totalFee * course.enrolledStudentsCount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  UserPlus,
  ArrowUpRight,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const MONTHLY_ENROLLMENT_DATA = [
  { month: "May", students: 12, collections: 240000 },
  { month: "Jun", students: 28, collections: 490000 },
  { month: "Jul", students: 45, collections: 820000 },
  { month: "Aug", students: 38, collections: 650000 },
  { month: "Sep", students: 54, collections: 910000 },
  { month: "Oct", students: 62, collections: 1120000 },
];

export default function DashboardOverviewPage() {
  const { students, courses, batches, enquiries, transactions, activeInstitute } = useDemo();

  // Calculate live KPI metrics from active store
  const totalStudents = students.length;
  const activeBatchesCount = batches.filter((b) => b.status === "Active").length;
  const totalFeesCollected = students.reduce((acc, s) => acc + s.fees.paid, 0);
  const totalOutstandingFees = students.reduce((acc, s) => acc + s.fees.pending, 0);
  const newEnquiriesCount = enquiries.filter((e) => e.status === "New").length;
  const avgAttendance = Math.round(
    students.reduce((acc, s) => acc + s.attendancePercentage, 0) / (students.length || 1)
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-800 text-blue-200 text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase">
              Phase 1 Interactive Demo
            </span>
            <span className="text-xs text-blue-200">• Multi-tenant Architecture</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold">Welcome back, {activeInstitute.name}</h2>
          <p className="text-xs text-blue-200 mt-1">
            All stats reflect reactive client demo state. You can record simulated fee payments, add students, take batch attendance, and progress inquiries.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/dashboard/students">
            <Button variant="secondary" size="sm" className="bg-white text-blue-950 hover:bg-blue-50 border-0">
              <Users className="h-4 w-4" /> View Directory
            </Button>
          </Link>
          <Link href="/dashboard/admissions">
            <Button size="sm" className="bg-blue-700 hover:bg-blue-600 text-white border-0">
              <UserPlus className="h-4 w-4" /> New Admission
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Link href="/dashboard/students">
          <Card className="hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Total Students</span>
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{totalStudents}</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
                <TrendingUp className="h-3 w-3" /> +14% this month
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/courses">
          <Card className="hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Active Batches</span>
                <BookOpen className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{activeBatchesCount}</div>
              <div className="text-[11px] text-slate-500 mt-1">Across 4 curriculum tracks</div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/fees">
          <Card className="hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Fees Collected</span>
                <CreditCard className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {formatCurrency(totalFeesCollected)}
              </div>
              <div className="text-[11px] text-emerald-600 font-medium mt-1">Live recorded balance</div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/fees">
          <Card className="hover:border-rose-400 hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Outstanding Fees</span>
                <AlertTriangle className="h-4 w-4 text-rose-500" />
              </div>
              <div className="text-2xl font-bold text-rose-600">
                {formatCurrency(totalOutstandingFees)}
              </div>
              <div className="text-[11px] text-rose-500 mt-1">Requires follow-up</div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/attendance">
          <Card className="hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Avg Attendance</span>
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{avgAttendance}%</div>
              <div className="text-[11px] text-slate-500 mt-1">Based on student records</div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admissions">
          <Card className="hover:border-amber-400 hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">New Enquiries</span>
                <UserPlus className="h-4 w-4 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{newEnquiriesCount}</div>
              <div className="text-[11px] text-amber-600 font-medium mt-1">Ready for follow-up</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Enrollment & Fee Collection Growth</CardTitle>
              <CardDescription>Academic intake trends for 2024 (Monthly)</CardDescription>
            </div>
            <Badge variant="outline">2024-25</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_ENROLLMENT_DATA}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="students"
                    name="Enrolled Students"
                    stroke="#1e3a8a"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorStudents)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule & Quick Live Hub */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Class Schedule</CardTitle>
            <CardDescription>Upcoming batches and lecture halls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {batches.map((batch) => (
              <div
                key={batch.id}
                className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-slate-100/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-xs text-slate-900">{batch.name}</p>
                  <Badge variant="info">{batch.enrolled}/{batch.capacity} Students</Badge>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" /> {batch.timing}
                  </span>
                  <span>• {batch.room}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">Faculty: {batch.teacherName}</p>
              </div>
            ))}
            <Link href="/dashboard/timetable" className="block text-center pt-2">
              <span className="text-xs text-blue-600 font-medium hover:underline inline-flex items-center gap-1">
                View Complete Weekly Timetable <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Admissions & Pending Fees Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Admissions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Admissions</CardTitle>
              <CardDescription>Newly enrolled students across batches</CardDescription>
            </div>
            <Link href="/dashboard/students">
              <Button variant="ghost" size="sm">
                View All <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-100">
              {students.slice(0, 4).map((student) => (
                <div key={student.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <Link
                      href={`/dashboard/students/${student.id}`}
                      className="font-medium text-xs text-blue-900 hover:underline"
                    >
                      {student.name}
                    </Link>
                    <p className="text-[11px] text-slate-500">
                      {student.rollNumber} • {student.courseName}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        student.fees.status === "Paid"
                          ? "success"
                          : student.fees.status === "Overdue"
                          ? "danger"
                          : "warning"
                      }
                    >
                      Fee: {student.fees.status}
                    </Badge>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Admitted: {formatDate(student.admissionDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions & Payments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Fee Collections</CardTitle>
              <CardDescription>Simulated transaction ledger</CardDescription>
            </div>
            <Link href="/dashboard/fees">
              <Button variant="ghost" size="sm">
                View Ledger <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-100">
              {transactions.slice(0, 4).map((tx) => (
                <div key={tx.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-xs text-slate-900">{tx.studentName}</p>
                    <p className="text-[11px] text-slate-500">
                      {tx.receiptNumber} • Mode: {tx.mode}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xs text-emerald-700">
                      +{formatCurrency(tx.amount)}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{formatDate(tx.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

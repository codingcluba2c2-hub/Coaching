"use client";

import React, { useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Calendar,
  Phone,
  Mail,
  BookOpen,
  CreditCard,
  CheckCircle,
  FileText,
  DollarSign,
  Download,
} from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";

function StudentDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { students, transactions, recordFeePayment } = useDemo();
  const [activeTab, setActiveTab] = useState<
    "overview" | "attendance" | "fees" | "exams" | "documents"
  >("overview");

  const student = students.find((s) => s.id === params?.id) || students[0];
  const studentTransactions = transactions.filter((t) => t.studentId === student?.id);

  if (!student) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">Student record not found.</p>
        <Link href="/dashboard/students">
          <Button variant="outline" size="sm" className="mt-4">
            Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button and profile heading */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/students">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" /> Back to Students
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
          <p className="text-xs text-slate-500">
            Roll No: <span className="font-semibold text-slate-700">{student.rollNumber}</span> • Enrolled: {formatDate(student.admissionDate)}
          </p>
        </div>
      </div>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                {student.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">{student.name}</h3>
                  <Badge variant="success">{student.status}</Badge>
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">{student.courseName}</p>
                <p className="text-xs text-slate-400">Batch: {student.batchName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto text-xs border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
              <div>
                <p className="text-slate-400">Attendance</p>
                <p className="text-sm font-bold text-emerald-600">{student.attendancePercentage}%</p>
              </div>
              <div>
                <p className="text-slate-400">Overall Score</p>
                <p className="text-sm font-bold text-blue-600">{student.overallScorePercentage}%</p>
              </div>
              <div>
                <p className="text-slate-400">Fees Paid</p>
                <p className="text-sm font-bold text-slate-900">{formatCurrency(student.fees.paid)}</p>
              </div>
              <div>
                <p className="text-slate-400">Pending Dues</p>
                <p className="text-sm font-bold text-rose-600">{formatCurrency(student.fees.pending)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-medium">
        {[
          { id: "overview", label: "Overview" },
          { id: "attendance", label: "Attendance Record" },
          { id: "fees", label: "Fee Ledger & Receipts" },
          { id: "exams", label: "Exam Marks & Diagnostics" },
          { id: "documents", label: "Uploaded Documents" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === tab.id
                ? "bg-blue-900 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal & Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Gender</span>
                <span className="font-semibold">{student.gender}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Date of Birth</span>
                <span className="font-semibold">{student.dob}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Email Address</span>
                <span className="font-semibold">{student.email}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Mobile Phone</span>
                <span className="font-semibold">{student.phone}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Admission Date</span>
                <span className="font-semibold">{formatDate(student.admissionDate)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guardian Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Guardian Name</span>
                <span className="font-semibold">{student.guardian.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Relationship</span>
                <span className="font-semibold">{student.guardian.relation}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Primary Phone</span>
                <span className="font-semibold">{student.guardian.phone}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Email</span>
                <span className="font-semibold">{student.guardian.email || "Not specified"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "attendance" && (
        <Card>
          <CardHeader>
            <CardTitle>Classroom Attendance Log</CardTitle>
            <CardDescription>Aggregate rate: {student.attendancePercentage}%</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-100 text-xs">
              {[
                { date: "2024-10-18", status: "Present", topic: "Rotational Equilibrium and Torque" },
                { date: "2024-10-16", status: "Present", topic: "Moment of Inertia Theorems" },
                { date: "2024-10-14", status: "Late", topic: "Kinematics of Pure Rolling" },
                { date: "2024-10-11", status: "Present", topic: "Problem Solving Clinic" },
                { date: "2024-10-09", status: "Absent", topic: "Angular Momentum Conservation" },
              ].map((row, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">{row.topic}</p>
                    <p className="text-[11px] text-slate-400">{formatDate(row.date)}</p>
                  </div>
                  <Badge
                    variant={
                      row.status === "Present"
                        ? "success"
                        : row.status === "Late"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {row.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "fees" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Fee Transactions & Receipts</CardTitle>
              <CardDescription>Simulated payment records</CardDescription>
            </div>
            {student.fees.pending > 0 && (
              <Button
                size="sm"
                onClick={() => recordFeePayment(student.id, Math.min(25000, student.fees.pending), "UPI")}
              >
                <DollarSign className="h-4 w-4" /> Quick Pay ₹25,000 (Demo)
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-2">Receipt No</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Payment Mode</th>
                    <th className="py-2">Status</th>
                    <th className="py-2 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-slate-400">
                        No transactions recorded for this student yet.
                      </td>
                    </tr>
                  ) : (
                    studentTransactions.map((tx) => (
                      <tr key={tx.id}>
                        <td className="py-2.5 font-semibold text-slate-800">{tx.receiptNumber}</td>
                        <td className="py-2.5 text-slate-500">{formatDate(tx.date)}</td>
                        <td className="py-2.5 font-bold text-emerald-700">{formatCurrency(tx.amount)}</td>
                        <td className="py-2.5">{tx.mode}</td>
                        <td className="py-2.5">
                          <Badge variant="success">{tx.status}</Badge>
                        </td>
                        <td className="py-2.5 text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-3.5 w-3.5" /> Download
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "exams" && (
        <Card>
          <CardHeader>
            <CardTitle>Internal Test Scores & Percentiles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-100 text-xs">
              {[
                { title: "Weekly Test 12 — Physics & Chem", score: "88/100", percentile: "94.2 %ile", date: "2024-10-12" },
                { title: "Monthly JEE Diagnostic Sprint", score: "246/300", percentile: "91.8 %ile", date: "2024-09-28" },
                { title: "Surprise Quiz: Integral Calculus", score: "45/50", percentile: "96.5 %ile", date: "2024-09-15" },
              ].map((exam, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">{exam.title}</p>
                    <p className="text-[11px] text-slate-500">Exam date: {formatDate(exam.date)}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-blue-900 text-sm">{exam.score}</span>
                    <Badge variant="info" className="ml-2">{exam.percentile}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "documents" && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded KYC & Admission Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {["10th Standard Marksheet Verified.pdf", "Aadhar Card ID.pdf", "Transfer Certificate.pdf"].map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-slate-800">{doc}</span>
                </div>
                <Badge variant="success">Verified</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function StudentDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading student profile...</div>}>
      <StudentDetailContent />
    </Suspense>
  );
}

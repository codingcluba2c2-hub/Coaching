"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  Download,
  Filter,
  Eye,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency, formatDate, exportToCSV } from "@/lib/utils";
import { Student } from "@/types";

export default function StudentsDirectoryPage() {
  const { students, courses, batches, addStudent } = useDemo();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for new student
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Male" as const,
    dob: "2008-01-15",
    courseId: courses[0]?.id || "",
    batchId: batches[0]?.id || "",
    guardianName: "",
    guardianPhone: "",
    guardianRelation: "Father",
    totalFee: 145000,
    paidFee: 45000,
  });

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone.includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBatch =
        selectedBatch === "ALL" || student.batchId === selectedBatch;

      const matchesStatus =
        selectedStatus === "ALL" || student.status === selectedStatus;

      return matchesSearch && matchesBatch && matchesStatus;
    });
  }, [students, searchTerm, selectedBatch, selectedStatus]);

  const handleExportCSV = () => {
    const rows = filteredStudents.map((s) => ({
      "Roll Number": s.rollNumber,
      Name: s.name,
      Email: s.email,
      Phone: s.phone,
      Course: s.courseName,
      Batch: s.batchName,
      "Admission Date": s.admissionDate,
      Status: s.status,
      "Total Fees": s.fees.total,
      "Paid Fees": s.fees.paid,
      "Pending Fees": s.fees.pending,
      "Attendance %": s.attendancePercentage,
      "Guardian Name": s.guardian.name,
      "Guardian Phone": s.guardian.phone,
    }));
    exportToCSV("Students_Directory_Apex_Academy", rows);
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const course = courses.find((c) => c.id === formData.courseId) || courses[0];
    const batch = batches.find((b) => b.id === formData.batchId) || batches[0];

    const pending = Math.max(0, formData.totalFee - formData.paidFee);
    const feeStatus =
      pending === 0 ? "Paid" : formData.paidFee > 0 ? "Partial" : "Pending";

    const newStudentData: Omit<Student, "id"> = {
      name: formData.name,
      rollNumber: `STD-2024-${Math.floor(100 + Math.random() * 900)}`,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      dob: formData.dob,
      courseId: course.id,
      courseName: course.name,
      batchId: batch.id,
      batchName: batch.name,
      admissionDate: new Date().toISOString().split("T")[0],
      status: "Active",
      guardian: {
        name: formData.guardianName,
        phone: formData.guardianPhone,
        relation: formData.guardianRelation,
      },
      fees: {
        total: formData.totalFee,
        paid: formData.paidFee,
        pending: pending,
        status: feeStatus,
      },
      attendancePercentage: 100,
      overallScorePercentage: 85,
    };

    addStudent(newStudentData);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Student Directory</h2>
          <p className="text-xs text-slate-500">
            Manage student enrollments, profiles, attendance records, and payment summaries.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4" /> Add New Student
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, roll number, phone or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-lg pl-9 pr-4 py-2 border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full bg-slate-50 text-slate-700 text-xs rounded-lg px-3 py-2 border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer"
              >
                <option value="ALL">All Batches</option>
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-slate-50 text-slate-700 text-xs rounded-lg px-3 py-2 border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Data Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                <th className="py-3 px-4">Student Profile</th>
                <th className="py-3 px-4">Enrolled Program & Batch</th>
                <th className="py-3 px-4">Fee Status</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Guardian Contact</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No matching student records found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <Link
                            href={`/dashboard/students/${student.id}`}
                            className="font-semibold text-blue-900 hover:underline"
                          >
                            {student.name}
                          </Link>
                          <p className="text-[11px] text-slate-500">
                            {student.rollNumber} • {student.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-800">{student.courseName}</p>
                      <p className="text-[11px] text-slate-500">{student.batchName}</p>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          student.fees.status === "Paid"
                            ? "success"
                            : student.fees.status === "Overdue"
                            ? "danger"
                            : "warning"
                        }
                      >
                        {student.fees.status}: {formatCurrency(student.fees.paid)} / {formatCurrency(student.fees.total)}
                      </Badge>
                      {student.fees.pending > 0 && (
                        <p className="text-[10px] text-rose-500 mt-0.5">
                          Pending: {formatCurrency(student.fees.pending)}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              student.attendancePercentage >= 90
                                ? "bg-emerald-500"
                                : student.attendancePercentage >= 75
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                            style={{ width: `${student.attendancePercentage}%` }}
                          />
                        </div>
                        <span className="font-semibold">{student.attendancePercentage}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-800">{student.guardian.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {student.guardian.relation} • {student.guardian.phone}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="success">{student.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link href={`/dashboard/students/${student.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3.5 w-3.5" /> Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredStudents.length} of {students.length} students</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <span className="font-medium text-slate-700">Page 1 of 1</span>
            <Button variant="outline" size="sm" disabled>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Add Student Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Student"
        description="Add a new student profile to the institute database (Phase 1 Simulated State)."
        maxWidth="xl"
      >
        <form onSubmit={handleCreateStudent} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Student Full Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ishaan Verma"
            />
            <Input
              label="Contact Email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="student@example.com"
            />
            <Input
              label="Mobile Number"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 00000"
            />
            <Select
              label="Gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
            <Select
              label="Course Track"
              value={formData.courseId}
              onChange={(e) => {
                const c = courses.find((item) => item.id === e.target.value);
                setFormData({
                  ...formData,
                  courseId: e.target.value,
                  totalFee: c?.totalFee || 145000,
                });
              }}
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({formatCurrency(c.totalFee)})
                </option>
              ))}
            </Select>
            <Select
              label="Assigned Batch"
              value={formData.batchId}
              onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
            >
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.timing})
                </option>
              ))}
            </Select>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Guardian Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                label="Guardian Name"
                required
                value={formData.guardianName}
                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                placeholder="Parent's Name"
              />
              <Input
                label="Guardian Phone"
                required
                value={formData.guardianPhone}
                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                placeholder="+91 98765 11111"
              />
              <Input
                label="Relation"
                required
                value={formData.guardianRelation}
                onChange={(e) => setFormData({ ...formData, guardianRelation: e.target.value })}
                placeholder="Father / Mother"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Fee Enrollment
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Total Course Fee (₹)"
                type="number"
                value={formData.totalFee}
                onChange={(e) => setFormData({ ...formData, totalFee: Number(e.target.value) })}
              />
              <Input
                label="Initial Downpayment (₹)"
                type="number"
                value={formData.paidFee}
                onChange={(e) => setFormData({ ...formData, paidFee: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Complete Registration</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

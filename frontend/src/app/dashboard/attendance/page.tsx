"use client";

import React, { useState } from "react";
import {
  CheckSquare,
  Calendar,
  Users,
  Check,
  X,
  Clock,
  Download,
  Save,
} from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { exportToCSV, formatDate } from "@/lib/utils";
import { AttendanceRecord } from "@/types";

export default function AttendanceManagementPage() {
  const { students, batches, saveAttendanceBatch } = useDemo();
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0]?.id || "");
  const [selectedDate, setSelectedDate] = useState("2024-10-20");

  React.useEffect(() => {
    setSelectedDate(new Date().toISOString().split("T")[0]);
  }, []);

  // Students belonging to the chosen batch
  const batchStudents = students.filter((s) => s.batchId === selectedBatchId);

  // Local state for current attendance marking sheet
  const [statusMap, setStatusMap] = useState<Record<string, "Present" | "Absent" | "Late">>({});

  const handleMarkStatus = (studentId: string, status: "Present" | "Absent" | "Late") => {
    setStatusMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, "Present" | "Absent" | "Late"> = {};
    batchStudents.forEach((s) => {
      updated[s.id] = "Present";
    });
    setStatusMap(updated);
  };

  const handleSaveAttendance = () => {
    const records: AttendanceRecord[] = batchStudents.map((s) => ({
      id: `att-${s.id}-${selectedDate}`,
      studentId: s.id,
      studentName: s.name,
      rollNumber: s.rollNumber,
      batchId: selectedBatchId,
      date: selectedDate,
      status: statusMap[s.id] || "Present",
    }));
    saveAttendanceBatch(records);
  };

  const handleExportAttendanceCSV = () => {
    const rows = batchStudents.map((s) => ({
      Date: selectedDate,
      "Batch ID": selectedBatchId,
      "Roll Number": s.rollNumber,
      "Student Name": s.name,
      Status: statusMap[s.id] || "Present",
    }));
    exportToCSV(`Attendance_${selectedBatchId}_${selectedDate}`, rows);
  };

  const presentCount = batchStudents.filter(
    (s) => (statusMap[s.id] || "Present") === "Present"
  ).length;
  const absentCount = batchStudents.filter(
    (s) => statusMap[s.id] === "Absent"
  ).length;
  const lateCount = batchStudents.filter(
    (s) => statusMap[s.id] === "Late"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Batch Attendance</h2>
          <p className="text-xs text-slate-500">
            Log daily student presence, mark excuses, and export muster sheets (Simulated Demo State).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportAttendanceCSV}>
            <Download className="h-4 w-4" /> Export Muster
          </Button>
          <Button size="sm" onClick={handleSaveAttendance}>
            <Save className="h-4 w-4" /> Save Records
          </Button>
        </div>
      </div>

      {/* Selector Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Select Academic Batch
              </label>
              <select
                value={selectedBatchId}
                onChange={(e) => setSelectedBatchId(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 text-xs rounded-lg px-3 py-2 border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
              >
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.timing})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Session Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 text-xs rounded-lg px-3 py-2 border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="secondary"
                size="sm"
                className="w-full h-9 text-xs"
                onClick={handleMarkAllPresent}
              >
                <Check className="h-4 w-4 text-emerald-600" /> Mark All Present
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-slate-500">Total Enrolled</p>
          <p className="text-xl font-bold text-slate-900">{batchStudents.length}</p>
        </Card>
        <Card className="p-4 border-emerald-100 bg-emerald-50/20">
          <p className="text-xs text-emerald-700 font-medium">Present</p>
          <p className="text-xl font-bold text-emerald-700">{presentCount}</p>
        </Card>
        <Card className="p-4 border-rose-100 bg-rose-50/20">
          <p className="text-xs text-rose-700 font-medium">Absent</p>
          <p className="text-xl font-bold text-rose-700">{absentCount}</p>
        </Card>
        <Card className="p-4 border-amber-100 bg-amber-50/20">
          <p className="text-xs text-amber-700 font-medium">Late Arrival</p>
          <p className="text-xl font-bold text-amber-700">{lateCount}</p>
        </Card>
      </div>

      {/* Attendance Sheet Table */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Register for {formatDate(selectedDate)}</CardTitle>
          <CardDescription>Click status buttons to toggle student attendance</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                <th className="py-3 px-4">Roll No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Historical Rate</th>
                <th className="py-3 px-4 text-center">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {batchStudents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    No students currently assigned to this batch.
                  </td>
                </tr>
              ) : (
                batchStudents.map((student) => {
                  const currentStatus = statusMap[student.id] || "Present";
                  return (
                    <tr key={student.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-medium text-slate-700">
                        {student.rollNumber}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900">{student.name}</p>
                        <p className="text-[11px] text-slate-400">{student.phone}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-700">
                          {student.attendancePercentage}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleMarkStatus(student.id, "Present")}
                            className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-all ${
                              currentStatus === "Present"
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            Present
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMarkStatus(student.id, "Late")}
                            className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-all ${
                              currentStatus === "Late"
                                ? "bg-amber-500 text-white shadow-xs"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            Late
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMarkStatus(student.id, "Absent")}
                            className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-all ${
                              currentStatus === "Absent"
                                ? "bg-rose-600 text-white shadow-xs"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

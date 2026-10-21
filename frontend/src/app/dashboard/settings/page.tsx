"use client";

import React, { useState } from "react";
import {
  Settings,
  Building2,
  Bell,
  Lock,
  Users,
  Shield,
  Save,
  CheckCircle2,
} from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";

export default function InstituteSettingsPage() {
  const { activeInstitute, addNotification } = useDemo();
  const [activeTab, setActiveTab] = useState<"profile" | "roles" | "branches" | "notifications">("profile");

  const [instituteData, setInstituteData] = useState({
    name: activeInstitute.name,
    tagline: activeInstitute.tagline,
    branch: activeInstitute.branch,
    academicYear: activeInstitute.academicYear,
    phone: activeInstitute.phone,
    email: activeInstitute.email,
    address: activeInstitute.address,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification("Institute settings updated successfully (Simulated Local State)");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Institute Configuration & SaaS Settings</h2>
        <p className="text-xs text-slate-500">
          Manage campus branding, academic sessions, multi-branch parameters, and role-based access rules.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-medium">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === "profile"
              ? "bg-blue-900 text-white font-semibold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Campus Profile & Branding
        </button>
        <button
          onClick={() => setActiveTab("branches")}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === "branches"
              ? "bg-blue-900 text-white font-semibold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Branch Locations
        </button>
        <button
          onClick={() => setActiveTab("roles")}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === "roles"
              ? "bg-blue-900 text-white font-semibold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Role Permissions Matrix
        </button>
      </div>

      {/* Profile & Branding View */}
      {activeTab === "profile" && (
        <Card>
          <CardHeader>
            <CardTitle>Institute Profile Details</CardTitle>
            <CardDescription>Official information appearing on receipts and portal headers</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Institute Full Legal Name"
                  value={instituteData.name}
                  onChange={(e) => setInstituteData({ ...instituteData, name: e.target.value })}
                />
                <Input
                  label="Motto / Brand Tagline"
                  value={instituteData.tagline}
                  onChange={(e) => setInstituteData({ ...instituteData, tagline: e.target.value })}
                />
                <Input
                  label="Active Academic Session"
                  value={instituteData.academicYear}
                  onChange={(e) => setInstituteData({ ...instituteData, academicYear: e.target.value })}
                />
                <Input
                  label="Campus Contact Phone"
                  value={instituteData.phone}
                  onChange={(e) => setInstituteData({ ...instituteData, phone: e.target.value })}
                />
                <Input
                  label="Official Admission Email"
                  type="email"
                  value={instituteData.email}
                  onChange={(e) => setInstituteData({ ...instituteData, email: e.target.value })}
                />
                <Input
                  label="Campus Physical Address"
                  value={instituteData.address}
                  onChange={(e) => setInstituteData({ ...instituteData, address: e.target.value })}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button type="submit">
                  <Save className="h-4 w-4" /> Save Configuration
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Branches View */}
      {activeTab === "branches" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "South Extension Campus (Main Headquarters)",
              code: "BR-DEL-01",
              status: "Primary Active",
              students: "194 Students",
              faculty: "14 Faculty",
              address: "Ring Road, South Ext-II, New Delhi",
            },
            {
              name: "Janakpuri West Branch",
              code: "BR-DEL-02",
              status: "Active",
              students: "112 Students",
              faculty: "8 Faculty",
              address: "District Centre, Janakpuri, New Delhi",
            },
            {
              name: "Noida Sector 62 Science Centre",
              code: "BR-NOI-03",
              status: "Upcoming (Dec 2024)",
              students: "Opening Soon",
              faculty: "Recruiting",
              address: "Institutional Area, Sector 62, Noida",
            },
          ].map((br, idx) => (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <CardTitle className="text-sm font-semibold">{br.name}</CardTitle>
                  <CardDescription>Code: {br.code}</CardDescription>
                </div>
                <Badge variant={br.status.includes("Active") ? "success" : "default"}>
                  {br.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <p className="text-slate-600">{br.address}</p>
                <div className="pt-2 border-t border-slate-100 flex justify-between text-slate-500">
                  <span>{br.students}</span>
                  <span>{br.faculty}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Roles & Permissions Matrix View */}
      {activeTab === "roles" && (
        <Card>
          <CardHeader>
            <CardTitle>Role-Based Access Control (RBAC) Architecture</CardTitle>
            <CardDescription>Permission mapping for future backend enforcement</CardDescription>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                  <th className="py-3 px-4">Feature Domain</th>
                  <th className="py-3 px-4 text-center">Super Admin</th>
                  <th className="py-3 px-4 text-center">Institute Admin</th>
                  <th className="py-3 px-4 text-center">Faculty / Teacher</th>
                  <th className="py-3 px-4 text-center">Student Portal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { domain: "Institute Setup & Multi-Branch", sa: "Full", ia: "Branch Only", fc: "None", st: "None" },
                  { domain: "Student Management & Enrollment", sa: "Full", ia: "Full", fc: "Assigned Batches", st: "Self Profile" },
                  { domain: "Fee Collection & Transactions", sa: "Full", ia: "Full", fc: "None", st: "View Own Ledger" },
                  { domain: "Daily Batch Attendance", sa: "Full", ia: "Full", fc: "Mark Assigned", st: "View Own Rate" },
                  { domain: "Question Banks & Quizzes", sa: "Full", ia: "Full", fc: "Create & Grade", st: "Attempt Tests" },
                  { domain: "Study Material LMS", sa: "Full", ia: "Full", fc: "Upload & Share", st: "Download Enrolled" },
                  { domain: "Live Class Broadcasting", sa: "Full", ia: "Schedule", fc: "Host Session", st: "Join Session" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-800">{row.domain}</td>
                    <td className="py-3 px-4 text-center font-medium text-emerald-700">{row.sa}</td>
                    <td className="py-3 px-4 text-center font-medium text-blue-700">{row.ia}</td>
                    <td className="py-3 px-4 text-center text-slate-600">{row.fc}</td>
                    <td className="py-3 px-4 text-center text-slate-600">{row.st}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

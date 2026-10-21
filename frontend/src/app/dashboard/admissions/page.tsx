"use client";

import React, { useState } from "react";
import {
  UserPlus,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
} from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { formatDate } from "@/lib/utils";
import { AdmissionEnquiry } from "@/types";

export default function AdmissionsPage() {
  const { enquiries, courses, batches, addEnquiry, updateEnquiryStatus, convertEnquiryToStudent } = useDemo();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [convertingEnquiry, setConvertingEnquiry] = useState<AdmissionEnquiry | null>(null);

  // Form State for new enquiry
  const [formData, setFormData] = useState({
    studentName: "",
    guardianName: "",
    phone: "",
    email: "",
    interestedCourse: courses[0]?.name || "JEE Advanced 2-Year Pinnacle",
    source: "Website Form" as const,
    notes: "",
  });

  // State for conversion modal
  const [convertCourseId, setConvertCourseId] = useState(courses[0]?.id || "");
  const [convertBatchId, setConvertBatchId] = useState(batches[0]?.id || "");

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.guardianName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCreateEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      studentName: formData.studentName,
      guardianName: formData.guardianName,
      phone: formData.phone,
      email: formData.email,
      interestedCourse: formData.interestedCourse,
      enquiryDate: new Date().toISOString().split("T")[0],
      followUpDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      status: "New",
      source: formData.source,
      notes: formData.notes,
    });
    setIsAddModalOpen(false);
    setFormData({
      studentName: "",
      guardianName: "",
      phone: "",
      email: "",
      interestedCourse: courses[0]?.name || "",
      source: "Website Form",
      notes: "",
    });
  };

  const handleConfirmAdmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!convertingEnquiry) return;
    convertEnquiryToStudent(convertingEnquiry.id, convertCourseId, convertBatchId);
    setConvertingEnquiry(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Admissions & Enquiries</h2>
          <p className="text-xs text-slate-500">
            Track inquiries, schedule follow-ups, and convert leads into active enrolled students.
          </p>
        </div>
        <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4" /> Log New Enquiry
        </Button>
      </div>

      {/* Filter and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by student name, guardian or phone number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-lg pl-9 pr-4 py-2 border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-50 text-slate-700 text-xs rounded-lg px-3 py-2 border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer"
              >
                <option value="ALL">All Enquiry Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Interested">Interested</option>
                <option value="Admitted">Admitted</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enquiries List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredEnquiries.map((enquiry) => (
          <Card key={enquiry.id} className="hover:border-slate-300 transition-colors">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{enquiry.studentName}</h3>
                    <Badge
                      variant={
                        enquiry.status === "Admitted"
                          ? "success"
                          : enquiry.status === "Interested"
                          ? "info"
                          : enquiry.status === "New"
                          ? "warning"
                          : "default"
                      }
                    >
                      {enquiry.status}
                    </Badge>
                    <span className="text-[11px] text-slate-400">• Source: {enquiry.source}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Interested Course: <span className="text-blue-900 font-semibold">{enquiry.interestedCourse}</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    Parent: {enquiry.guardianName} • Phone: {enquiry.phone} • Email: {enquiry.email || "N/A"}
                  </p>
                  {enquiry.notes && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 mt-2">
                      <strong>Notes:</strong> {enquiry.notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                  <div className="text-left sm:text-right text-xs">
                    <p className="text-slate-400">Enquiry Date: {formatDate(enquiry.enquiryDate)}</p>
                    <p className="text-blue-600 font-medium mt-0.5">
                      Follow up: {formatDate(enquiry.followUpDate)}
                    </p>
                  </div>

                  {enquiry.status !== "Admitted" && (
                    <div className="flex items-center gap-2">
                      <select
                        value={enquiry.status}
                        onChange={(e) => updateEnquiryStatus(enquiry.id, e.target.value as any)}
                        className="bg-white border border-slate-300 text-xs rounded-lg px-2 py-1.5 text-slate-700 cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Interested">Interested</option>
                        <option value="Lost">Lost</option>
                      </select>

                      <Button
                        size="sm"
                        onClick={() => setConvertingEnquiry(enquiry)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Admit Student
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Log Enquiry Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Log New Admission Enquiry"
        description="Record prospective student interest and initiate the counseling workflow."
      >
        <form onSubmit={handleCreateEnquiry} className="space-y-3 text-xs">
          <Input
            label="Student Name"
            required
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            placeholder="e.g. Priyanshu Jha"
          />
          <Input
            label="Guardian / Parent Name"
            required
            value={formData.guardianName}
            onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
            placeholder="Parent's name"
          />
          <Input
            label="Phone Number"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 00000"
          />
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="parent@example.com"
          />
          <Select
            label="Course of Interest"
            value={formData.interestedCourse}
            onChange={(e) => setFormData({ ...formData, interestedCourse: e.target.value })}
          >
            {courses.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </Select>
          <Select
            label="Lead Source"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
          >
            <option value="Website Form">Website Form</option>
            <option value="Walk-in">Walk-in Inquiry</option>
            <option value="Phone Referral">Phone Referral</option>
            <option value="Social Media">Social Media</option>
          </Select>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Counseling Notes</label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-slate-300 p-2 text-xs focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Prior academic marks, questions asked, batch preference..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Enquiry</Button>
          </div>
        </form>
      </Modal>

      {/* Convert to Admitted Student Modal */}
      <Modal
        isOpen={!!convertingEnquiry}
        onClose={() => setConvertingEnquiry(null)}
        title="Complete Student Admission"
        description={`Admit ${convertingEnquiry?.studentName} and create live student and fee ledger records.`}
      >
        <form onSubmit={handleConfirmAdmission} className="space-y-4 text-xs">
          <p className="text-slate-600">
            Converting this enquiry will register the student in the database, assign them to a batch, generate an enrollment roll number, and credit an initial token payment of ₹25,000.
          </p>
          <Select
            label="Enrollment Course"
            value={convertCourseId}
            onChange={(e) => setConvertCourseId(e.target.value)}
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
          <Select
            label="Assign to Batch"
            value={convertBatchId}
            onChange={(e) => setConvertBatchId(e.target.value)}
          >
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.timing})
              </option>
            ))}
          </Select>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setConvertingEnquiry(null)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Confirm & Admit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

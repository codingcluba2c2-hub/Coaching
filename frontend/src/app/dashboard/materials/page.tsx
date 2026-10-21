"use client";

import React, { useState } from "react";
import {
  FolderOpen,
  FileText,
  Video,
  Download,
  Upload,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatDate } from "@/lib/utils";
import { STUDY_MATERIALS, ASSIGNMENTS } from "@/lib/demo-data";
import { useDemo } from "@/providers/DemoProvider";

export default function StudyMaterialsPage() {
  const { addNotification } = useDemo();
  const [activeTab, setActiveTab] = useState<"materials" | "assignments">("materials");
  const [subjectFilter, setSubjectFilter] = useState("ALL");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredMaterials = STUDY_MATERIALS.filter((mat) => {
    return subjectFilter === "ALL" || mat.subject === subjectFilter;
  });

  const handleDownload = (title: string) => {
    addNotification(`Downloaded demo material: "${title}"`);
  };

  const handleUploadSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploadModalOpen(false);
    addNotification("Material uploaded and distributed to assigned batch (Simulated)");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Learning Management System (LMS)</h2>
          <p className="text-xs text-slate-500">
            Publish lecture slides, high-yield formula sheets, assignments, and digital modules.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setIsUploadModalOpen(true)}>
            <Upload className="h-4 w-4" /> Upload Resource
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-medium">
        <button
          onClick={() => setActiveTab("materials")}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === "materials"
              ? "bg-blue-900 text-white font-semibold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Study Materials & Notes ({STUDY_MATERIALS.length})
        </button>
        <button
          onClick={() => setActiveTab("assignments")}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === "assignments"
              ? "bg-blue-900 text-white font-semibold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Homework Assignments ({ASSIGNMENTS.length})
        </button>
      </div>

      {/* Study Materials View */}
      {activeTab === "materials" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {["ALL", "Physics", "Chemistry", "Biology"].map((sub) => (
              <button
                key={sub}
                onClick={() => setSubjectFilter(sub)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  subjectFilter === sub
                    ? "bg-blue-900 text-white font-semibold"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {sub === "ALL" ? "All Subjects" : sub}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredMaterials.map((mat) => (
              <Card key={mat.id} className="hover:border-blue-300 transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{mat.subject}</Badge>
                    <span className="text-[11px] text-slate-400">{mat.type} • {mat.sizeOrDuration}</span>
                  </div>
                  <CardTitle className="text-sm font-semibold">{mat.title}</CardTitle>
                  <CardDescription>{mat.course}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100">
                    <span>Uploaded: {formatDate(mat.uploadDate)}</span>
                    <span>{mat.downloadsCount} Downloads</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => handleDownload(mat.title)}
                  >
                    <Download className="h-3.5 w-3.5" /> Download Asset
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Assignments View */}
      {activeTab === "assignments" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ASSIGNMENTS.map((asg) => {
            const submissionRate = Math.round(
              (asg.submissionsCount / asg.totalStudentsCount) * 100
            );
            return (
              <Card key={asg.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="info">{asg.subject}</Badge>
                    <Badge variant={asg.status === "Active" ? "success" : "default"}>
                      {asg.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{asg.title}</CardTitle>
                  <CardDescription>{asg.batchName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span>Assigned: {formatDate(asg.assignedDate)}</span>
                    <span className="font-semibold text-rose-600">
                      Due: {formatDate(asg.dueDate)}
                    </span>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>
                        Submissions: {asg.submissionsCount} / {asg.totalStudentsCount} Students
                      </span>
                      <span className="font-semibold text-slate-800">{submissionRate}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600"
                        style={{ width: `${submissionRate}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Learning Material"
        description="Share reference notes, revision guides or solution keys."
      >
        <form onSubmit={handleUploadSimulate} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Document Title</label>
            <input
              required
              className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="e.g. Chapter 4 - Thermodynamics Formula Sheet"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Select File</label>
            <input
              type="file"
              required
              className="w-full border border-slate-300 rounded-lg p-2 text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-900 file:font-semibold"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Publish Resource</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

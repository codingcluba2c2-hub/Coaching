"use client";

import React, { useState } from "react";
import {
  Video,
  Calendar,
  Clock,
  User,
  ExternalLink,
  Plus,
  PlayCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input, Select } from "@/components/ui/Input";
import { LIVE_CLASSES } from "@/lib/demo-data";
import { useDemo } from "@/providers/DemoProvider";

export default function LiveClassesPage() {
  const { courses, batches, addNotification } = useDemo();
  const [classes, setClasses] = useState(LIVE_CLASSES);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    instructor: "Dr. Arvind Mehta",
    courseName: courses[0]?.name || "",
    batchName: batches[0]?.name || "",
    scheduledTime: "Tomorrow at 05:00 PM",
    meetingLink: "https://meet.google.com/demo-lecture",
  });

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClass = {
      id: `live-${Date.now()}`,
      title: formData.title,
      instructor: formData.instructor,
      courseName: formData.courseName,
      batchName: formData.batchName,
      scheduledTime: formData.scheduledTime,
      date: new Date().toISOString().split("T")[0],
      meetingLink: formData.meetingLink,
      status: "Upcoming" as const,
    };
    setClasses((prev) => [newClass, ...prev]);
    setIsScheduleModalOpen(false);
    addNotification(`Scheduled live class: "${newClass.title}"`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Live Virtual Classrooms</h2>
          <p className="text-xs text-slate-500">
            Schedule interactive webinar sessions, doubt-solving bootcamps, and hybrid streams.
          </p>
        </div>
        <Button size="sm" onClick={() => setIsScheduleModalOpen(true)}>
          <Plus className="h-4 w-4" /> Schedule New Session
        </Button>
      </div>

      {/* Integration Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-xs text-blue-900">
        <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Video Streaming Integration Notice</p>
          <p className="text-blue-800/80 mt-0.5">
            Phase 1 provides scheduling and direct room linking (Google Meet / Zoom / Microsoft Teams). Live peer-to-peer conferencing and in-app recording will be driven by the future backend video service.
          </p>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <Card key={cls.id} className="hover:border-blue-300 transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between mb-2">
                <Badge variant={cls.status === "Live" ? "danger" : "info"}>
                  {cls.status === "Live" ? "● Streaming Live Now" : cls.status}
                </Badge>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-blue-600" /> {cls.scheduledTime}
                </span>
              </div>
              <CardTitle className="text-base">{cls.title}</CardTitle>
              <CardDescription>{cls.courseName} • {cls.batchName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-600 font-medium">Instructor: {cls.instructor}</span>
                <a
                  href={cls.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button
                    size="sm"
                    className={
                      cls.status === "Live"
                        ? "bg-rose-600 hover:bg-rose-700 text-white"
                        : "bg-blue-900 text-white hover:bg-blue-950"
                    }
                  >
                    <PlayCircle className="h-4 w-4" />
                    {cls.status === "Live" ? "Enter Live Room" : "Open Link"}
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Schedule Modal */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Schedule Live Broadcast Session"
        description="Notify enrolled students and generate class credentials."
      >
        <form onSubmit={handleScheduleSubmit} className="space-y-3 text-xs">
          <Input
            label="Class Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Masterclass on Organic Reaction Mechanisms"
          />
          <Input
            label="Faculty Lead"
            required
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
          />
          <Input
            label="Schedule Time String"
            required
            value={formData.scheduledTime}
            onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
            placeholder="e.g. Tomorrow at 04:30 PM"
          />
          <Input
            label="Meeting Link URL"
            required
            value={formData.meetingLink}
            onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
            placeholder="https://meet.google.com/xxx-xxxx-xxx"
          />
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsScheduleModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Session</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

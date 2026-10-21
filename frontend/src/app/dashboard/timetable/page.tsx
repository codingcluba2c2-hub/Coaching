"use client";

import React, { useState } from "react";
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function TimetablePage() {
  const { batches } = useDemo();
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [viewMode, setViewMode] = useState<"week" | "day">("week");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Institute Master Timetable</h2>
          <p className="text-xs text-slate-500">
            Weekly classroom schedule, faculty allocations, and lecture timing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-200/80 p-1 rounded-lg flex text-xs">
            <button
              onClick={() => setViewMode("week")}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                viewMode === "week" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
              }`}
            >
              Week Grid
            </button>
            <button
              onClick={() => setViewMode("day")}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                viewMode === "day" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
              }`}
            >
              Day View
            </button>
          </div>
        </div>
      </div>

      {/* Week Grid View */}
      {viewMode === "week" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DAYS.map((day) => {
            const dayBatches = batches.filter((b) => b.days.includes(day));
            return (
              <Card key={day} className="border-slate-200">
                <CardHeader className="py-3 px-4 bg-slate-50/80 border-b border-slate-100 flex flex-row items-center justify-between">
                  <span className="font-bold text-xs text-slate-800">{day}</span>
                  <Badge variant="outline">{dayBatches.length} Sessions</Badge>
                </CardHeader>
                <CardContent className="p-3 space-y-2">
                  {dayBatches.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">No classes scheduled</p>
                  ) : (
                    dayBatches.map((batch) => (
                      <div
                        key={batch.id}
                        className="p-3 rounded-lg border border-slate-100 bg-white hover:border-blue-300 transition-all shadow-2xs"
                      >
                        <p className="font-semibold text-xs text-slate-900">{batch.name}</p>
                        <p className="text-[11px] text-blue-800 font-medium">{batch.courseName}</p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-slate-400" /> {batch.timing}
                          </span>
                          <span>{batch.room}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">Instructor: {batch.teacherName}</p>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Day View */
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                  selectedDay === day
                    ? "bg-blue-900 text-white"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Schedule for {selectedDay}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {batches
                .filter((b) => b.days.includes(selectedDay))
                .map((batch) => (
                  <div
                    key={batch.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{batch.name}</span>
                        <Badge variant="info">{batch.room}</Badge>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{batch.courseName}</p>
                      <p className="text-xs text-slate-400 mt-1">Faculty: {batch.teacherName}</p>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center gap-2">
                      <div className="bg-blue-50 border border-blue-200 text-blue-900 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-blue-600" /> {batch.timing}
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

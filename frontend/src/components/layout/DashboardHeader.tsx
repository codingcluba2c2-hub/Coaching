"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  Calendar,
  Sparkles,
  UserCheck,
  Building,
  Menu,
} from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";
import { Badge } from "@/components/ui/Badge";

export function DashboardHeader({ onToggleMobileMenu }: { onToggleMobileMenu?: () => void }) {
  const { activeInstitute, enquiries } = useDemo();
  const [showNotifications, setShowNotifications] = useState(false);

  const pendingEnquiriesCount = enquiries.filter((e) => e.status === "New").length;

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      <div className="flex items-center gap-4">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="relative w-72 md:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search students, roll no, courses, batches..."
            className="w-full bg-slate-100/70 text-slate-800 text-xs rounded-lg pl-9 pr-4 py-2 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Academic Session indicator */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs text-slate-600">
          <Calendar className="h-3.5 w-3.5 text-blue-600" />
          <span>Session: <strong>{activeInstitute.academicYear}</strong></span>
        </div>

        {/* Notification center */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            {pendingEnquiriesCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-xl p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                <h4 className="text-xs font-semibold text-slate-900">Notifications & Alerts</h4>
                <Badge variant="info">{pendingEnquiriesCount} New</Badge>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto text-xs">
                {enquiries.slice(0, 3).map((enq) => (
                  <Link
                    key={enq.id}
                    href="/dashboard/admissions"
                    onClick={() => setShowNotifications(false)}
                    className="block p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors"
                  >
                    <p className="font-semibold text-slate-800 truncate">
                      {enq.studentName} — {enq.interestedCourse}
                    </p>
                    <p className="text-[11px] text-slate-500">Status: {enq.status} • Follow up on {enq.followUpDate}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="h-8 w-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-blue-100">
            RK
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-900 leading-none">Rajesh Kaushik</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Admin & Director</p>
          </div>
        </div>
      </div>
    </header>
  );
}

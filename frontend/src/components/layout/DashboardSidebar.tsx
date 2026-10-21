"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  UserPlus,
  BookOpen,
  Calendar,
  CheckSquare,
  CreditCard,
  FileSpreadsheet,
  FolderOpen,
  Video,
  BarChart3,
  Settings,
  ChevronRight,
  LogOut,
  Building2,
} from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { activeInstitute, role, setRole } = useDemo();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Students", href: "/dashboard/students", icon: Users },
    { name: "Admissions & Inquiries", href: "/dashboard/admissions", icon: UserPlus },
    { name: "Courses & Batches", href: "/dashboard/courses", icon: BookOpen },
    { name: "Timetable", href: "/dashboard/timetable", icon: Calendar },
    { name: "Attendance", href: "/dashboard/attendance", icon: CheckSquare },
    { name: "Fee Management", href: "/dashboard/fees", icon: CreditCard },
    { name: "Exams & Quizzes", href: "/dashboard/exams", icon: FileSpreadsheet },
    { name: "Study Materials", href: "/dashboard/materials", icon: FolderOpen },
    { name: "Live Classes", href: "/dashboard/live-classes", icon: Video },
    { name: "Reports & Analytics", href: "/dashboard/reports", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-800">
      {/* Institute Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-purple-600/30 text-lg">
          E
        </div>
        <div className="overflow-hidden">
          <h1 className="font-semibold text-sm text-white truncate leading-tight">
            Edupath Academy
          </h1>
          <p className="text-[11px] text-purple-300 truncate flex items-center gap-1 mt-0.5">
            <Building2 className="h-3 w-3 inline text-purple-400" /> Online Learning Hub
          </p>
        </div>
      </div>

      {/* Role Switcher Demo Badge */}
      <div className="px-4 py-2 bg-slate-800/40 border-b border-slate-800 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">
          Demo View:
        </span>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className="bg-slate-800 text-blue-400 font-semibold rounded px-2 py-0.5 text-xs outline-none border border-slate-700 cursor-pointer"
        >
          <option value="INSTITUTE_ADMIN">Institute Admin</option>
          <option value="SUPER_ADMIN">Super Admin</option>
          <option value="BRANCH_MANAGER">Branch Manager</option>
        </select>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Institute Management
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group",
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight className="h-3.5 w-3.5 text-white/70" />}
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Portals
        </div>
        <Link
          href="/student"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-emerald-400 hover:bg-emerald-950/30 hover:text-emerald-300 transition-colors"
        >
          <GraduationCap className="h-4 w-4" />
          <span>Student Portal</span>
        </Link>
        <Link
          href="/teacher"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-amber-400 hover:bg-amber-950/30 hover:text-amber-300 transition-colors"
        >
          <Users className="h-4 w-4" />
          <span>Faculty Portal</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-indigo-400 hover:bg-indigo-950/30 hover:text-indigo-300 transition-colors"
        >
          <Building2 className="h-4 w-4" />
          <span>Public Website</span>
        </Link>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 flex items-center justify-between">
        <div>
          <p className="font-semibold text-slate-300">Dr. Rajesh Kaushik</p>
          <p className="text-[10px]">Academic Director</p>
        </div>
        <Link
          href="/login"
          title="Sign out (demo)"
          className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors"
        >
          <LogOut className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}

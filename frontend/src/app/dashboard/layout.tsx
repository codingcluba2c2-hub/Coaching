"use client";

import React, { useState, Suspense } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex shrink-0">
        <Suspense fallback={<aside className="w-64 bg-slate-900 min-h-screen shrink-0" />}>
          <DashboardSidebar />
        </Suspense>
      </div>

      {/* Mobile Sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex flex-col w-64 max-w-xs bg-slate-900 z-10">
            <Suspense fallback={<aside className="w-64 bg-slate-900 min-h-screen" />}>
              <DashboardSidebar />
            </Suspense>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading module...</div>}>
              {children}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useDemo } from "@/providers/DemoProvider";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToastContainer() {
  const { notifications, removeNotification } = useDemo();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {notifications.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />,
          warning: <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />,
          error: <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />,
          info: <Info className="h-5 w-5 text-blue-500 shrink-0" />,
        };

        const borders = {
          success: "border-emerald-200 bg-white",
          warning: "border-amber-200 bg-white",
          error: "border-rose-200 bg-white",
          info: "border-blue-200 bg-white",
        };

        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-lg transition-all animate-in slide-in-from-bottom-2",
              borders[toast.type]
            )}
          >
            <div className="flex items-center gap-2.5">
              {icons[toast.type]}
              <p className="text-xs font-medium text-slate-800">{toast.message}</p>
            </div>
            <button
              onClick={() => removeNotification(toast.id)}
              className="text-slate-400 hover:text-slate-600 ml-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

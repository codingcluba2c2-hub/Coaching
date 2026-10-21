"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight, ShieldCheck, Lock, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { useDemo } from "@/providers/DemoProvider";
import { UserRole } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const { setRole, activeInstitute } = useDemo();
  const [selectedRole, setSelectedRole] = useState<UserRole>("INSTITUTE_ADMIN");
  const [email, setEmail] = useState("admin@apexacademy.edu");
  const [password, setPassword] = useState("••••••••");

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === "INSTITUTE_ADMIN" || role === "SUPER_ADMIN" || role === "BRANCH_MANAGER") {
      setEmail("admin@apexacademy.edu");
    } else if (role === "TEACHER") {
      setEmail("a.mehta@coachingos.edu");
    } else if (role === "STUDENT") {
      setEmail("aarav.sharma@example.com");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);

    if (selectedRole === "STUDENT") {
      router.push("/student");
    } else if (selectedRole === "TEACHER") {
      router.push("/teacher");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#120c2b] flex flex-col items-center justify-center p-4 selection:bg-purple-600 selection:text-white">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-2xl tracking-wider">E</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">
              Edu<span className="text-purple-400">path</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-white tracking-tight">Welcome to Edupath Portal</h1>
          <p className="text-xs text-purple-200/70">Single Sign-On for Students, Tutors & Admins</p>
        </div>

        {/* Login Card */}
        <Card className="bg-white rounded-3xl border-purple-100 shadow-2xl p-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-slate-900 font-bold">Sign in to your account</CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Select a workspace demo role to test the learning portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Role Demo Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-purple-50 rounded-xl text-[11px] font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => handleRoleSelect("INSTITUTE_ADMIN")}
                className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedRole === "INSTITUTE_ADMIN"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "hover:text-purple-900"
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect("TEACHER")}
                className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedRole === "TEACHER"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "hover:text-purple-900"
                }`}
              >
                Teacher
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect("STUDENT")}
                className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedRole === "STUDENT"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "hover:text-purple-900"
                }`}
              >
                Student
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-3 text-xs">
              <Input
                label="Registered Email ID"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 accent-purple-600" />
                  Remember me
                </label>
                <span className="text-purple-600 font-semibold hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <Button type="submit" size="md" className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-2 font-bold shadow-md shadow-purple-600/20">
                Enter {selectedRole.replace("_", " ")} Portal <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="pt-2 border-t border-purple-50 text-[11px] text-slate-400 text-center">
              Edupath Cloud • Fast, secure role-based learning access
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-purple-200/70">
          <Link href="/" className="hover:text-white transition-colors">
            ← Back to Edupath Homepage
          </Link>
        </p>
      </div>
    </div>
  );
}

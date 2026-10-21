"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Search,
  DollarSign,
  Download,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Plus,
  Eye,
} from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency, formatDate, exportToCSV } from "@/lib/utils";
import { FeeTransaction } from "@/types";

export default function FeeManagementPage() {
  const { students, transactions, recordFeePayment } = useDemo();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCollectModalOpen, setIsCollectModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || "");
  const [paymentAmount, setPaymentAmount] = useState(25000);
  const [paymentMode, setPaymentMode] = useState<FeeTransaction["mode"]>("UPI");
  const [previewReceipt, setPreviewReceipt] = useState<FeeTransaction | null>(null);

  // Financial aggregates
  const totalBilled = students.reduce((acc, s) => acc + s.fees.total, 0);
  const totalCollected = students.reduce((acc, s) => acc + s.fees.paid, 0);
  const totalOutstanding = students.reduce((acc, s) => acc + s.fees.pending, 0);
  const overdueCount = students.filter((s) => s.fees.status === "Overdue").length;

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    recordFeePayment(selectedStudentId, Number(paymentAmount), paymentMode);
    setIsCollectModalOpen(false);
  };

  const handleExportTransactionsCSV = () => {
    const rows = transactions.map((t) => ({
      "Receipt Number": t.receiptNumber,
      Date: t.date,
      "Student Name": t.studentName,
      "Roll Number": t.rollNumber,
      Amount: t.amount,
      Mode: t.mode,
      Status: t.status,
      "Collected By": t.collectedBy,
    }));
    exportToCSV("Fee_Transactions_Ledger", rows);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Fee Management & Billing</h2>
          <p className="text-xs text-slate-500">
            Track tuition collections, overdue balances, simulated fee transactions, and receipts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportTransactionsCSV}>
            <Download className="h-4 w-4" /> Export Ledger
          </Button>
          <Button size="sm" onClick={() => setIsCollectModalOpen(true)}>
            <Plus className="h-4 w-4" /> Collect Fee (Demo)
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-slate-500">Total Billed Fees</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalBilled)}</p>
          <p className="text-[11px] text-slate-400 mt-1">Across all registered students</p>
        </Card>
        <Card className="p-4 border-emerald-100 bg-emerald-50/20">
          <p className="text-xs text-emerald-700 font-semibold">Total Collections</p>
          <p className="text-2xl font-bold text-emerald-700">{formatCurrency(totalCollected)}</p>
          <p className="text-[11px] text-emerald-600 mt-1">
            {Math.round((totalCollected / (totalBilled || 1)) * 100)}% realization rate
          </p>
        </Card>
        <Card className="p-4 border-rose-100 bg-rose-50/20">
          <p className="text-xs text-rose-700 font-semibold">Outstanding Balance</p>
          <p className="text-2xl font-bold text-rose-700">{formatCurrency(totalOutstanding)}</p>
          <p className="text-[11px] text-rose-500 mt-1">Total pending dues</p>
        </Card>
        <Card className="p-4 border-amber-100 bg-amber-50/20">
          <p className="text-xs text-amber-700 font-semibold">Overdue Accounts</p>
          <p className="text-2xl font-bold text-amber-700">{overdueCount} Students</p>
          <p className="text-[11px] text-amber-600 mt-1">Require reminder notices</p>
        </Card>
      </div>

      {/* Student Fee Ledger Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Student-Wise Fee Accounts</CardTitle>
          <CardDescription>Installment status and collected balances</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-4">Total Tuition</th>
                <th className="py-3 px-4">Paid Amount</th>
                <th className="py-3 px-4">Balance Pending</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{student.name}</p>
                    <p className="text-[11px] text-slate-400">{student.rollNumber}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{student.courseName}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {formatCurrency(student.fees.total)}
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-700">
                    {formatCurrency(student.fees.paid)}
                  </td>
                  <td className="py-3 px-4 font-bold text-rose-600">
                    {formatCurrency(student.fees.pending)}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        student.fees.status === "Paid"
                          ? "success"
                          : student.fees.status === "Overdue"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {student.fees.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {student.fees.pending > 0 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedStudentId(student.id);
                          setPaymentAmount(Math.min(25000, student.fees.pending));
                          setIsCollectModalOpen(true);
                        }}
                      >
                        Collect Due
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Transactions History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payment Transactions</CardTitle>
          <CardDescription>Recorded receipt audit log</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                <th className="py-3 px-4">Receipt No</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Channel</th>
                <th className="py-3 px-4">Collected By</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-mono font-medium text-slate-800">
                    {tx.receiptNumber}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{formatDate(tx.date)}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{tx.studentName}</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="py-3 px-4">{tx.mode}</td>
                  <td className="py-3 px-4 text-slate-500">{tx.collectedBy}</td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewReceipt(tx)}
                    >
                      <Receipt className="h-3.5 w-3.5" /> Preview
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Collect Fee Modal */}
      <Modal
        isOpen={isCollectModalOpen}
        onClose={() => setIsCollectModalOpen(false)}
        title="Record Fee Payment (Simulated Demo)"
        description="Select a student to record an installment and update their live balance."
      >
        <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
          <Select
            label="Select Student Account"
            value={selectedStudentId}
            onChange={(e) => {
              setSelectedStudentId(e.target.value);
              const st = students.find((s) => s.id === e.target.value);
              if (st) setPaymentAmount(Math.min(25000, st.fees.pending));
            }}
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.rollNumber}) — Due: {formatCurrency(s.fees.pending)}
              </option>
            ))}
          </Select>

          <Input
            label="Collection Amount (₹)"
            type="number"
            min={500}
            required
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(Number(e.target.value))}
          />

          <Select
            label="Payment Mode"
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value as any)}
          >
            <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
            <option value="Bank Transfer">NEFT / RTGS Bank Transfer</option>
            <option value="Cash">Cash at Counter</option>
            <option value="Card">Debit / Credit Card (POS)</option>
            <option value="Cheque">Cheque</option>
          </Select>

          <p className="text-[11px] text-slate-500 bg-blue-50 p-2.5 rounded-lg border border-blue-100">
            <strong>Note:</strong> This simulates a real transaction. The student&apos;s paid amount and outstanding dues will update immediately in the dashboard and student portal.
          </p>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsCollectModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Record Payment</Button>
          </div>
        </form>
      </Modal>

      {/* Receipt Preview Modal */}
      <Modal
        isOpen={!!previewReceipt}
        onClose={() => setPreviewReceipt(null)}
        title="Official Fee Receipt Preview"
        description="Fictional institute payment confirmation."
        maxWidth="md"
      >
        {previewReceipt && (
          <div className="space-y-4 text-xs p-4 border border-slate-200 rounded-xl bg-slate-50">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">APEX ACADEMY OF SCIENCES</h3>
              <p className="text-slate-500 text-[11px]">South Extension Campus • Tax ID: DEMO-EDU-0921</p>
              <Badge variant="success" className="mt-2">Payment Confirmed</Badge>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Receipt Number:</span>
                <span className="font-mono font-semibold">{previewReceipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-medium">{formatDate(previewReceipt.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Student Name:</span>
                <span className="font-bold text-slate-800">{previewReceipt.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Roll Number:</span>
                <span className="font-mono">{previewReceipt.rollNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode:</span>
                <span>{previewReceipt.mode}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
              <span>Amount Paid:</span>
              <span className="text-emerald-700">{formatCurrency(previewReceipt.amount)}</span>
            </div>

            <p className="text-[10px] text-center text-slate-400 pt-2 border-t border-slate-100">
              Computer generated simulated receipt. No signature required.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

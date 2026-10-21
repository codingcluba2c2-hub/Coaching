"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Student,
  Course,
  Batch,
  AdmissionEnquiry,
  FeeTransaction,
  AttendanceRecord,
  UserRole,
} from "@/types";
import {
  INITIAL_STUDENTS,
  INITIAL_COURSES,
  INITIAL_BATCHES,
  INITIAL_ENQUIRIES,
  INITIAL_TRANSACTIONS,
} from "@/lib/demo-data";

interface NotificationToast {
  id: string;
  type: "success" | "info" | "warning" | "error";
  message: string;
}

interface DemoContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  students: Student[];
  courses: Course[];
  batches: Batch[];
  enquiries: AdmissionEnquiry[];
  transactions: FeeTransaction[];
  attendanceRecords: AttendanceRecord[];
  activeInstitute: {
    name: string;
    tagline: string;
    branch: string;
    academicYear: string;
    phone: string;
    email: string;
    address: string;
  };
  addStudent: (student: Omit<Student, "id">) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addEnquiry: (enquiry: Omit<AdmissionEnquiry, "id">) => void;
  updateEnquiryStatus: (id: string, status: AdmissionEnquiry["status"]) => void;
  convertEnquiryToStudent: (enquiryId: string, courseId: string, batchId: string) => void;
  recordFeePayment: (studentId: string, amount: number, mode: FeeTransaction["mode"]) => void;
  saveAttendanceBatch: (records: AttendanceRecord[]) => void;
  notifications: NotificationToast[];
  addNotification: (message: string, type?: NotificationToast["type"]) => void;
  removeNotification: (id: string) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("INSTITUTE_ADMIN");
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [batches, setBatches] = useState<Batch[]>(INITIAL_BATCHES);
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>(INITIAL_ENQUIRIES);
  const [transactions, setTransactions] = useState<FeeTransaction[]>(INITIAL_TRANSACTIONS);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [notifications, setNotifications] = useState<NotificationToast[]>([]);

  const activeInstitute = {
    name: "Apex Academy of Sciences",
    tagline: "Premier Foundation & Competitive Exam Institute",
    branch: "South Extension Campus (Main)",
    academicYear: "2024-2025",
    phone: "+91 11 4982 7700",
    email: "admissions@apexacademy.edu",
    address: "Block B-14, Ring Road, South Extension Part II, New Delhi - 110049",
  };

  const addNotification = (message: string, type: NotificationToast["type"] = "success") => {
    const id = "ntf-" + Date.now() + Math.random().toString(36).substring(2, 5);
    setNotifications((prev) => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const addStudent = (studentData: Omit<Student, "id">) => {
    const newStudent: Student = {
      ...studentData,
      id: `std-${Date.now().toString().slice(-4)}`,
    };
    setStudents((prev) => [newStudent, ...prev]);
    addNotification(`Student ${newStudent.name} registered successfully (Local State)`);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((std) => (std.id === id ? { ...std, ...updates } : std))
    );
    addNotification("Student record updated successfully (Local State)");
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((std) => std.id !== id));
    addNotification("Student profile archived (Local State)", "info");
  };

  const addEnquiry = (enquiryData: Omit<AdmissionEnquiry, "id">) => {
    const newEnquiry: AdmissionEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now().toString().slice(-4)}`,
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    addNotification(`Enquiry from ${newEnquiry.studentName} logged successfully`);
  };

  const updateEnquiryStatus = (id: string, status: AdmissionEnquiry["status"]) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    addNotification(`Enquiry status updated to ${status}`);
  };

  const convertEnquiryToStudent = (
    enquiryId: string,
    courseId: string,
    batchId: string
  ) => {
    const enquiry = enquiries.find((e) => e.id === enquiryId);
    if (!enquiry) return;

    const course = courses.find((c) => c.id === courseId) || courses[0];
    const batch = batches.find((b) => b.id === batchId) || batches[0];

    const newStudent: Student = {
      id: `std-${Date.now().toString().slice(-4)}`,
      name: enquiry.studentName,
      rollNumber: `STD-2024-${Math.floor(100 + Math.random() * 900)}`,
      email: enquiry.email || `${enquiry.studentName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      phone: enquiry.phone,
      gender: "Male",
      dob: "2008-01-01",
      courseId: course.id,
      courseName: course.name,
      batchId: batch.id,
      batchName: batch.name,
      admissionDate: new Date().toISOString().split("T")[0],
      status: "Active",
      guardian: {
        name: enquiry.guardianName || "Guardian",
        phone: enquiry.phone,
        relation: "Parent",
      },
      fees: {
        total: course.totalFee,
        paid: 25000,
        pending: course.totalFee - 25000,
        status: "Partial",
      },
      attendancePercentage: 100,
      overallScorePercentage: 85,
    };

    setStudents((prev) => [newStudent, ...prev]);
    setEnquiries((prev) =>
      prev.map((e) => (e.id === enquiryId ? { ...e, status: "Admitted" } : e))
    );

    // Record initial token receipt
    const tx: FeeTransaction = {
      id: `tx-${Date.now().toString().slice(-4)}`,
      receiptNumber: `REC-2024-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: newStudent.id,
      studentName: newStudent.name,
      rollNumber: newStudent.rollNumber,
      amount: 25000,
      mode: "UPI",
      date: new Date().toISOString().split("T")[0],
      status: "Success",
      installmentNumber: 1,
      collectedBy: "Admission Desk",
    };
    setTransactions((prev) => [tx, ...prev]);

    addNotification(`Enquiry converted to Admitted Student: ${newStudent.name}`);
  };

  const recordFeePayment = (
    studentId: string,
    amount: number,
    mode: FeeTransaction["mode"]
  ) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const newPaid = student.fees.paid + amount;
    const newPending = Math.max(0, student.fees.total - newPaid);
    const newStatus =
      newPending === 0 ? "Paid" : newPaid > 0 ? "Partial" : "Pending";

    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              fees: {
                ...s.fees,
                paid: newPaid,
                pending: newPending,
                status: newStatus,
              },
            }
          : s
      )
    );

    const tx: FeeTransaction = {
      id: `tx-${Date.now().toString().slice(-4)}`,
      receiptNumber: `REC-2024-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: student.id,
      studentName: student.name,
      rollNumber: student.rollNumber,
      amount,
      mode,
      date: new Date().toISOString().split("T")[0],
      status: "Success",
      installmentNumber: transactions.filter((t) => t.studentId === studentId).length + 1,
      collectedBy: "Institute Frontdesk",
    };

    setTransactions((prev) => [tx, ...prev]);
    addNotification(`Recorded payment of ${amount.toLocaleString("en-IN", { style: "currency", currency: "INR" })} for ${student.name}`);
  };

  const saveAttendanceBatch = (records: AttendanceRecord[]) => {
    setAttendanceRecords((prev) => {
      const filtered = prev.filter(
        (p) => !records.some((r) => r.studentId === p.studentId && r.date === p.date)
      );
      return [...records, ...filtered];
    });
    addNotification(`Marked attendance for ${records.length} students (Local State)`);
  };

  return (
    <DemoContext.Provider
      value={{
        role,
        setRole,
        students,
        courses,
        batches,
        enquiries,
        transactions,
        attendanceRecords,
        activeInstitute,
        addStudent,
        updateStudent,
        deleteStudent,
        addEnquiry,
        updateEnquiryStatus,
        convertEnquiryToStudent,
        recordFeePayment,
        saveAttendanceBatch,
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}

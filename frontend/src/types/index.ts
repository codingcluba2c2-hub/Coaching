export type UserRole =
  | "SUPER_ADMIN"
  | "INSTITUTE_ADMIN"
  | "BRANCH_MANAGER"
  | "TEACHER"
  | "STUDENT";

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  avatar?: string;
  email: string;
  phone: string;
  gender: "Male" | "Female" | "Other";
  dob: string;
  courseId: string;
  courseName: string;
  batchId: string;
  batchName: string;
  admissionDate: string;
  status: "Active" | "Inactive" | "Suspended" | "Alumni";
  guardian: {
    name: string;
    phone: string;
    relation: string;
    email?: string;
  };
  fees: {
    total: number;
    paid: number;
    pending: number;
    status: "Paid" | "Partial" | "Pending" | "Overdue";
  };
  attendancePercentage: number;
  overallScorePercentage: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  category: "Engineering (JEE)" | "Medical (NEET)" | "Foundations (9-10)" | "Commerce & CA" | "Board Exams";
  duration: string;
  totalFee: number;
  assignedFaculty: string;
  batchCount: number;
  enrolledStudentsCount: number;
  status: "Active" | "Archived" | "Upcoming";
  description: string;
  syllabus: string[];
}

export interface Batch {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  teacherId: string;
  teacherName: string;
  schedule: string;
  timing: string;
  capacity: number;
  enrolled: number;
  room: string;
  status: "Active" | "Completed" | "Upcoming";
  days: string[];
}

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  subject: string;
  experience: string;
  email: string;
  phone: string;
  avatar: string;
  activeBatchesCount: number;
  totalStudents: number;
  rating: number;
}

export interface AdmissionEnquiry {
  id: string;
  studentName: string;
  guardianName: string;
  phone: string;
  email: string;
  interestedCourse: string;
  enquiryDate: string;
  followUpDate: string;
  status: "New" | "Contacted" | "Interested" | "Admitted" | "Lost";
  source: "Website Form" | "Walk-in" | "Phone Referral" | "Social Media";
  notes: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  batchId: string;
  date: string;
  status: "Present" | "Absent" | "Late";
  remarks?: string;
}

export interface FeeTransaction {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  amount: number;
  mode: "UPI" | "Cash" | "Bank Transfer" | "Card" | "Cheque";
  date: string;
  status: "Success" | "Pending" | "Failed";
  installmentNumber: number;
  collectedBy: string;
}

export interface Exam {
  id: string;
  title: string;
  courseName: string;
  batchName: string;
  date: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  status: "Scheduled" | "Ongoing" | "Completed";
  highestScore?: number;
  averageScore?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  course: string;
  type: "PDF" | "Video" | "Document" | "Slides";
  sizeOrDuration: string;
  uploadDate: string;
  downloadsCount: number;
  fileUrl: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  courseName: string;
  batchName: string;
  assignedDate: string;
  dueDate: string;
  totalMarks: number;
  submissionsCount: number;
  totalStudentsCount: number;
  status: "Active" | "Closed";
}

export interface LiveClass {
  id: string;
  title: string;
  instructor: string;
  courseName: string;
  batchName: string;
  scheduledTime: string;
  date: string;
  meetingLink: string;
  status: "Live" | "Upcoming" | "Completed";
}

import { z } from "zod";

export const StudentFormSchema = z.object({
  name: z.string().min(2, "Student name must be at least 2 characters"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.string().min(1, "Date of birth is required"),
  courseId: z.string().min(1, "Please select an enrolled course"),
  batchId: z.string().min(1, "Please assign to a batch"),
  guardianName: z.string().min(2, "Guardian name is required"),
  guardianPhone: z.string().min(10, "Guardian contact number is required"),
  guardianRelation: z.string().min(2, "Relation is required (e.g. Father, Mother)"),
  guardianEmail: z.string().email().optional().or(z.literal("")),
});

export type StudentFormData = z.infer<typeof StudentFormSchema>;

export const EnquiryFormSchema = z.object({
  studentName: z.string().min(2, "Student name must be at least 2 characters"),
  guardianName: z.string().min(2, "Guardian name is required"),
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email("Valid email address is required").optional().or(z.literal("")),
  interestedCourse: z.string().min(1, "Please select an intended course"),
  source: z.enum(["Website Form", "Walk-in", "Phone Referral", "Social Media"]).default("Website Form"),
  notes: z.string().optional(),
});

export type EnquiryFormData = z.infer<typeof EnquiryFormSchema>;

export const FeeCollectionSchema = z.object({
  studentId: z.string().min(1, "Please select a student"),
  amount: z.number().min(500, "Minimum collection amount is ₹500"),
  mode: z.enum(["UPI", "Cash", "Bank Transfer", "Card", "Cheque"]),
  remarks: z.string().optional(),
});

export type FeeCollectionFormData = z.infer<typeof FeeCollectionSchema>;

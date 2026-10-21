"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Award,
  Search,
  ShoppingCart,
  Play,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Monitor,
  Smile,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  HelpCircle,
} from "lucide-react";
import { useDemo } from "@/providers/DemoProvider";

export default function EdupathHomePage() {
  const { addEnquiry } = useDemo();

  // ScrollSpy Active Tab State
  const [activeSection, setActiveSection] = useState<string>("home");

  // Lead capture consultation modal & newsletter states
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"All" | "Popular" | "Free" | "Featured">("All");

  const [showConsultModal, setShowConsultModal] = useState(false);
  const [consultForm, setConsultForm] = useState({
    studentName: "",
    email: "",
    phone: "",
    course: "Full Stack Web Development",
  });
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // Dedicated Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Course Inquiry",
    message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do online courses work on Edupath?",
      a: "All Edupath courses feature self-paced video modules, interactive hands-on coding assignments, downloadable course guides, and live weekly Q&A workshops with instructors.",
    },
    {
      q: "Will I receive an industry-recognized certificate upon completion?",
      a: "Yes! Every completed course or masterclass track awards a verifiable digital certificate accredited by Edupath, complete with a unique verification link for your LinkedIn and portfolio.",
    },
    {
      q: "Can I switch courses or request a refund if I change my mind?",
      a: "We offer an unconditional 7-day money-back guarantee. If a course isn't the right fit, you can switch to any other program or request a 100% refund without questions.",
    },
    {
      q: "How does 1-on-1 private mentoring work?",
      a: "Enrolled students can book 45-minute one-on-one sessions directly from the student workspace. Mentors review your code, give career advice, and help prepare for interviews.",
    },
    {
      q: "Are the courses suitable for absolute beginners?",
      a: "Absolutely. Each track starts with foundational principles before moving to advanced real-world projects. Prerequisites and difficulty tags are clearly stated.",
    },
  ];

  // Exact 1-to-1 Sequence matching Navbar:
  // 1. home -> 2. courses -> 3. about -> 4. features (Pages) -> 5. contact
  useEffect(() => {
    const sectionIds = ["home", "courses", "about", "features", "contact"];

    const handleScroll = () => {
      // Near bottom of document: always activate contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120) {
        setActiveSection("contact");
        return;
      }

      const scrollPosition = window.scrollY + 220;
      let currentSection = "home";

      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler with offset for sticky header
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      studentName: consultForm.studentName,
      guardianName: "Self/Parent",
      phone: consultForm.phone,
      email: consultForm.email,
      interestedCourse: consultForm.course,
      enquiryDate: "2026-10-21",
      followUpDate: "2026-10-24",
      status: "New",
      source: "Edupath Online Lead",
      notes: "Lead registered from Edupath consultation modal.",
    });
    setConsultSubmitted(true);
    setTimeout(() => {
      setShowConsultModal(false);
      setConsultSubmitted(false);
    }, 2200);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      studentName: contactForm.name,
      guardianName: "Website Visitor",
      phone: contactForm.phone || "N/A",
      email: contactForm.email,
      interestedCourse: contactForm.subject,
      enquiryDate: "2026-10-21",
      followUpDate: "2026-10-23",
      status: "New",
      source: "Website Contact Form",
      notes: contactForm.message,
    });
    setContactSubmitted(true);
  };

  const courseList = [
    {
      id: "c-1",
      title: "App Development Course",
      tag: "Free",
      eventBadge: "Event",
      tagColor: "bg-purple-600 text-white",
      lessons: "10 Lessons",
      students: "49 Students",
      price: "$19",
      instructor: "Calvin Carlo",
      instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
      image: "/images/course-dev.jpg",
      description: "The phrasal sequence of the is now so that many campaign and benefit for mobile architecture.",
    },
    {
      id: "c-2",
      title: "Spoken English Popular Course",
      tag: "Free",
      eventBadge: "Event",
      tagColor: "bg-purple-600 text-white",
      lessons: "10 Lessons",
      students: "49 Students",
      price: "$29",
      instructor: "Calvin Carlo",
      instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
      image: "/images/course-english.jpg",
      description: "The phrasal sequence of the is now so that many campaign and global fluent speech mastery.",
    },
    {
      id: "c-3",
      title: "Front-end Development Course",
      tag: "Free",
      eventBadge: "Event",
      tagColor: "bg-purple-600 text-white",
      lessons: "10 Lessons",
      students: "49 Students",
      price: "$24",
      instructor: "Calvin Carlo",
      instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
      image: "/images/course-frontend.jpg",
      description: "Master modern UI styling, responsive component architecture, and high performance interactive apps.",
    },
    {
      id: "c-4",
      title: "Full stack Project in Nextjs Course",
      tag: "Free",
      eventBadge: "Event",
      tagColor: "bg-purple-600 text-white",
      lessons: "10 Lessons",
      students: "49 Students",
      price: "$29",
      instructor: "Calvin Carlo",
      instructorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
      image: "/images/course-fullstack.jpg",
      description: "The phrasal sequence of modern Next.js server actions, fullstack databases, auth and cloud deployment.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9fd] text-[#1e1b4b] flex flex-col selection:bg-purple-600 selection:text-white font-sans">
      {/* Top Navbar with Clean Clean Nav (No Dropdown Arrows) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/25 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl tracking-wider">E</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-[#18113c]">
              Edu<span className="text-purple-600">path</span>
            </span>
          </Link>

          {/* Clean Navigation Links with Underline Indicator */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-600 h-full">
            {/* 1. Home Tab */}
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "home")}
              className={`relative py-2 transition-colors cursor-pointer ${
                activeSection === "home"
                  ? "text-purple-600 font-bold"
                  : "hover:text-purple-600"
              }`}
            >
              Home
              {activeSection === "home" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full transition-all duration-300" />
              )}
            </a>

            {/* 2. Courses Tab */}
            <a
              href="#courses"
              onClick={(e) => scrollToSection(e, "courses")}
              className={`relative py-2 transition-colors cursor-pointer ${
                activeSection === "courses"
                  ? "text-purple-600 font-bold"
                  : "hover:text-purple-600"
              }`}
            >
              Courses
              {activeSection === "courses" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full transition-all duration-300" />
              )}
            </a>

            {/* 3. About Us Tab */}
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "about")}
              className={`relative py-2 transition-colors cursor-pointer ${
                activeSection === "about"
                  ? "text-purple-600 font-bold"
                  : "hover:text-purple-600"
              }`}
            >
              About Us
              {activeSection === "about" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full transition-all duration-300" />
              )}
            </a>

            {/* 4. Pages (Features & FAQs) Tab */}
            <a
              href="#features"
              onClick={(e) => scrollToSection(e, "features")}
              className={`relative py-2 transition-colors cursor-pointer ${
                activeSection === "features"
                  ? "text-purple-600 font-bold"
                  : "hover:text-purple-600"
              }`}
            >
              Pages
              {activeSection === "features" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full transition-all duration-300" />
              )}
            </a>

            {/* 5. Contact Us Tab */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className={`relative py-2 transition-colors cursor-pointer ${
                activeSection === "contact"
                  ? "text-purple-600 font-bold"
                  : "hover:text-purple-600"
              }`}
            >
              Contact Us
              {activeSection === "contact" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full transition-all duration-300" />
              )}
            </a>
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const element = document.getElementById("courses");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label="Search courses"
              className="p-2.5 rounded-full hover:bg-purple-50 text-slate-600 hover:text-purple-600 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowConsultModal(true)}
              aria-label="Shopping Cart"
              className="p-2.5 rounded-full hover:bg-purple-50 text-slate-600 hover:text-purple-600 transition-colors relative cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-600 ring-2 ring-white"></span>
            </button>

            {/* User Profile Avatar / Sign In */}
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 transition-all border border-purple-100"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces"
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-purple-600"
              />
              <span className="text-xs font-semibold text-purple-900">Sign In</span>
            </Link>

            {/* Dashboard Link button */}
            <Link
              href="/dashboard"
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-purple-600/25 transition-all hover:shadow-lg hover:shadow-purple-600/30"
            >
              Institute Portal
            </Link>
          </div>
        </div>
      </header>

      {/* 1. HOME SECTION (#home) */}
      <section id="home" className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-28 scroll-mt-20">
        <div className="absolute top-10 right-1/4 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 text-purple-700 font-semibold text-xs tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                Special Online Launch 2026-27
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#191439] tracking-tight leading-[1.15]">
                Best <span className="bg-purple-600 text-white px-3 py-1 rounded-md inline-block shadow-sm">Online</span> Courses
                <br />
                From Edupath
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                Discover a world of knowledge and opportunities with our online education platform pursue a new career.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#courses"
                  onClick={(e) => scrollToSection(e, "courses")}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  View Courses <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setShowConsultModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-purple-50 text-purple-700 font-semibold text-sm border border-purple-200 shadow-sm transition-all cursor-pointer"
                >
                  Book Free Mentorship
                </button>
              </div>

              {/* Floating Social Proof */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-purple-100/80">
                <div>
                  <div className="text-2xl font-extrabold text-[#191439]">25,000+</div>
                  <div className="text-xs text-slate-500 font-medium">Active Learners</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#191439]">100+</div>
                  <div className="text-xs text-slate-500 font-medium">Online Courses</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#191439]">98%</div>
                  <div className="text-xs text-slate-500 font-medium">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual with Edupath Badges */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[430px] md:h-[430px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-700 to-purple-500 shadow-2xl shadow-purple-600/30 overflow-hidden"></div>

                <div className="absolute inset-0 flex items-end justify-center">
                  <img
                    src="/images/hero-student.jpg"
                    alt="Edupath Happy Student"
                    className="w-full h-full object-cover rounded-full mix-blend-normal transform scale-105 hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Badge 1: Online Course 100+ */}
                <div className="absolute -top-3 -right-2 sm:top-4 sm:right-0 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl shadow-purple-900/10 border border-purple-100 flex items-center gap-3 animate-bounce [animation-duration:3s]">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-500 font-medium leading-none">Online Course</span>
                    <span className="text-base font-extrabold text-slate-900">100+</span>
                  </div>
                </div>

                {/* Badge 2: Our Instructors */}
                <div className="absolute -bottom-4 -left-2 sm:bottom-4 sm:-left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl shadow-purple-900/10 border border-purple-100 flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-slate-800">Our Instructors</span>
                  <div className="flex items-center -space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=faces"
                      alt="Instructor"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=faces"
                      alt="Instructor"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=faces"
                      alt="Instructor"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    />
                    <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos Strip */}
      <section className="py-10 border-y border-purple-100/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-around gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-extrabold text-xl text-slate-700 tracking-wider">amazon</span>
            <span className="font-bold text-xl text-slate-700">Google</span>
            <span className="font-bold text-xl text-slate-700 tracking-wide">Lenovo</span>
            <span className="font-extrabold text-xl text-slate-700 italic">PayPal</span>
            <span className="font-bold text-xl text-slate-700">shopify</span>
            <span className="font-bold text-xl text-slate-700 flex items-center gap-1">
              Spotify
            </span>
          </div>
        </div>
      </section>

      {/* 2. COURSES SECTION (#courses) - Positioned Second */}
      <section id="courses" className="py-20 md:py-28 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 text-purple-700 font-semibold text-xs tracking-wide mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Top Rated Academic Tracks
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#191439]">Explore Our Best Courses</h2>
          <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
            Discover a world of knowledge and opportunities with our online education platform pursue a new career.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {(["All", "Popular", "Free", "Featured"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                    : "bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-600 border border-purple-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Course Cards Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {courseList.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl p-5 border border-purple-100/80 shadow-sm hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300 flex flex-col sm:flex-row gap-5 group"
              >
                {/* Course Image & Price Tag */}
                <div className="relative w-full sm:w-48 h-44 rounded-xl overflow-hidden flex-shrink-0 bg-purple-50">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {course.tag}
                    </span>
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {course.eventBadge}
                    </span>
                  </div>
                  {/* Floating Price Tag */}
                  <div className="absolute bottom-2.5 right-2.5 bg-purple-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-full shadow-md">
                    {course.price}
                  </div>
                </div>

                {/* Course Content */}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium mb-2">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-purple-600" /> {course.lessons}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-purple-600" /> {course.students}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#191439] group-hover:text-purple-600 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Instructor & Explore Link */}
                  <div className="pt-4 mt-2 border-t border-purple-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs font-semibold text-slate-700">{course.instructor}</span>
                    </div>
                    <button
                      onClick={() => setShowConsultModal(true)}
                      className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
                    >
                      Explore &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* See More Courses Button */}
          <div className="mt-12">
            <button
              onClick={() => setShowConsultModal(true)}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-purple-600 transition-colors cursor-pointer"
            >
              See More Courses &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 3. ABOUT US SECTION (#about) - Positioned Third */}
      <section id="about" className="py-20 md:py-28 bg-white border-y border-purple-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Media with Play Button */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10 border border-purple-100 group">
                <img
                  src="/images/access-learning.jpg"
                  alt="Students learning on laptops"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setShowConsultModal(true)}
                    className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/40 hover:scale-110 transition-transform cursor-pointer"
                    aria-label="Watch video"
                  >
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Information */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                About Edupath Global
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#191439] leading-tight">
                Access to Learning
                <br />
                Anytime & Anyware
              </h2>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &apos;lorem ipsum&apos; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.
              </p>

              {/* 4 Feature Bullet Points in 2 columns */}
              <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  <span className="text-sm font-semibold text-slate-800">Flexible Timing</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  <span className="text-sm font-semibold text-slate-800">Affordable</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  <span className="text-sm font-semibold text-slate-800">Easy Learning</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  <span className="text-sm font-semibold text-slate-800">World Class</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => setShowConsultModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-600/20 transition-all cursor-pointer"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PAGES (FEATURES & FAQS) SECTION (#features) - Positioned Fourth */}
      <section id="features" className="py-20 bg-[#faf9fd] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 text-purple-700 font-semibold text-xs tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Platform Highlights & Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#191439]">Discover Powerful Features</h2>
          <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
            Discover a world of knowledge and opportunities with our online education platform pursue a new career.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 text-left border border-purple-100/70 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#191439] mb-2">Certificate</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                The phrasal sequence of the is now so that many campaign and benefit with accredited certificates.
              </p>
              <button
                onClick={() => setShowConsultModal(true)}
                className="text-xs font-bold text-purple-600 hover:text-purple-700 inline-flex items-center gap-1 cursor-pointer"
              >
                Read More &rarr;
              </button>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 text-left border border-purple-100/70 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#191439] mb-2">Private Mentoring</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                The phrasal sequence of the is now so that many campaign and benefit with 1-on-1 personalized guidance.
              </p>
              <button
                onClick={() => setShowConsultModal(true)}
                className="text-xs font-bold text-purple-600 hover:text-purple-700 inline-flex items-center gap-1 cursor-pointer"
              >
                Read More &rarr;
              </button>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 text-left border border-purple-100/70 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                <Smile className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#191439] mb-2">Creative Thinking</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                The phrasal sequence of the is now so that many campaign and benefit to boost innovative problem solving.
              </p>
              <button
                onClick={() => setShowConsultModal(true)}
                className="text-xs font-bold text-purple-600 hover:text-purple-700 inline-flex items-center gap-1 cursor-pointer"
              >
                Read More &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* FAQs inside Pages section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center space-y-2 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#191439]">
              Questions You Might Have
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Clear answers regarding our curriculum, mentorship sessions, certification, and admissions.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-purple-100/90 bg-white overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-slate-900 hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-purple-100/60 bg-[#faf9fd]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CONTACT US SECTION (#contact) - Positioned Fifth */}
      <section id="contact" className="py-20 bg-white scroll-mt-20 border-t border-purple-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">GET IN TOUCH</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#191439]">
              Contact Our Academic Mentors
            </h2>
            <p className="text-sm text-slate-600">
              Have questions about curricula, schedules, scholarships, or batch admissions? Send us a message.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 bg-[#faf9fd] rounded-3xl p-8 border border-purple-100 shadow-md shadow-purple-900/5 space-y-6">
              <h3 className="text-xl font-bold text-[#191439]">Campus & Support Desk</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect with our academic counseling team for syllabus consultations or institutional enrollment.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Campus Location</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Edupath Learning Park, Sector 62, Innovation Corridor</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Helpline Phone</h4>
                    <p className="text-xs text-slate-500 mt-0.5">+1 (800) 244-3387 / +91 (120) 456-7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Email Address</h4>
                    <p className="text-xs text-slate-500 mt-0.5">support@edupath.org / admissions@edupath.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Working Hours</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Monday to Saturday: 8:00 AM – 9:00 PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Inquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-xl shadow-purple-900/5">
              {contactSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you for reaching out. An Edupath senior mentor will review your inquiry and connect with you shortly.
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-xs cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-[#191439] mb-1">Send Direct Message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Subject / Program</label>
                      <select
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                      >
                        <option value="Course Inquiry">General Course Inquiry</option>
                        <option value="App Development Course">App Development Course</option>
                        <option value="Spoken English Popular Course">Spoken English Popular Course</option>
                        <option value="Front-end Development Course">Front-end Development Course</option>
                        <option value="Full stack Project in Nextjs Course">Full stack Next.js Course</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message or Learning Needs</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell us what skills or support you need..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Vibrant Purple Newsletter & Tutor Banner Section */}
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Subscription form */}
            <div className="lg:col-span-7 py-16 md:py-20 space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-purple-200">
                STAY UPDATED
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Subscribe to our Newsletter!
              </h2>
              <p className="text-sm text-purple-100 max-w-lg leading-relaxed">
                Receive weekly insights, curated learning paths, and early enrollment discounts right in your inbox.
              </p>

              {newsletterSuccess ? (
                <div className="p-4 rounded-xl bg-white/20 backdrop-blur-md text-white font-medium text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  Thank you! You are now subscribed to Edupath updates.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) setNewsletterSuccess(true);
                  }}
                  className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 flex-grow"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Right Tutor Image cutout */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-64 sm:w-80 h-72 sm:h-96">
                <img
                  src="/images/newsletter-tutor.jpg"
                  alt="Edupath Mentor"
                  className="w-full h-full object-cover object-top rounded-t-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer matching Edupath */}
      <footer className="bg-[#120c2b] text-white pt-16 pb-12 border-t border-purple-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-purple-900/50">
            {/* Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold">
                  E
                </div>
                <span className="font-bold text-2xl tracking-tight text-white">
                  Edu<span className="text-purple-400">path</span>
                </span>
              </div>
              <p className="text-xs text-purple-200/70 leading-relaxed">
                Empowering learners worldwide with interactive online courses, industry mentors, and comprehensive institutional tracking.
              </p>
            </div>

            {/* Quick Navigation */}
            <div>
              <h4 className="font-bold text-sm text-white mb-4">Quick Navigation</h4>
              <ul className="space-y-2 text-xs text-purple-200/70">
                <li><a href="#courses" onClick={(e) => scrollToSection(e, "courses")} className="hover:text-white transition-colors cursor-pointer">Popular Courses</a></li>
                <li><a href="#about" onClick={(e) => scrollToSection(e, "about")} className="hover:text-white transition-colors cursor-pointer">About Our Academy</a></li>
                <li><a href="#features" onClick={(e) => scrollToSection(e, "features")} className="hover:text-white transition-colors cursor-pointer">Features & FAQs</a></li>
                <li><a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className="hover:text-white transition-colors cursor-pointer">Contact Us</a></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Student & Staff Login</Link></li>
              </ul>
            </div>

            {/* Academic Programs */}
            <div>
              <h4 className="font-bold text-sm text-white mb-4">Popular Programs</h4>
              <ul className="space-y-2 text-xs text-purple-200/70">
                <li><span onClick={() => setShowConsultModal(true)} className="hover:text-white cursor-pointer">Web Development Masterclass</span></li>
                <li><span onClick={() => setShowConsultModal(true)} className="hover:text-white cursor-pointer">Mobile App Engineering</span></li>
                <li><span onClick={() => setShowConsultModal(true)} className="hover:text-white cursor-pointer">Spoken English Fluency</span></li>
                <li><span onClick={() => setShowConsultModal(true)} className="hover:text-white cursor-pointer">Fullstack Next.js Projects</span></li>
              </ul>
            </div>

            {/* Contact Portal */}
            <div>
              <h4 className="font-bold text-sm text-white mb-4">Institute Portal</h4>
              <p className="text-xs text-purple-200/70 leading-relaxed mb-4">
                Access faculty records, student admissions, fee ledgers, and live classes.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md transition-all"
              >
                Go to Admin Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-200/50 gap-4">
            <p>&copy; 2026 Edupath Education Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="hover:text-purple-200 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-purple-200 cursor-pointer">Terms of Service</span>
              <span className="hover:text-purple-200 cursor-pointer">Support</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Free Mentorship / Consultation Modal */}
      {showConsultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative">
            <button
              onClick={() => setShowConsultModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"
            >
              &times;
            </button>

            {consultSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Consultation Booked!</h3>
                <p className="text-xs text-slate-600">
                  Our Edupath senior mentor will connect with you within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 mb-3">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Book Free Mentoring Session</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Get custom course recommendations and free trial access.
                  </p>
                </div>

                <form onSubmit={handleConsultSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={consultForm.studentName}
                      onChange={(e) => setConsultForm({ ...consultForm, studentName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={consultForm.email}
                      onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={consultForm.phone}
                      onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Program</label>
                    <select
                      value={consultForm.course}
                      onChange={(e) => setConsultForm({ ...consultForm, course: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm bg-white"
                    >
                      <option value="App Development Course">App Development Course</option>
                      <option value="Spoken English Popular Course">Spoken English Popular Course</option>
                      <option value="Front-end Development Course">Front-end Development Course</option>
                      <option value="Full stack Project in Nextjs Course">Full stack Project in Nextjs Course</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-600/25 transition-all mt-2 cursor-pointer"
                  >
                    Confirm Free Consultation
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

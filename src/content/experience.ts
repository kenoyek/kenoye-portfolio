export type ExperienceEntry = {
  title: string;
  organization: string;
  period: string;
  type: "Consulting" | "Instruction" | "Employment";
  summary: string;
  evidence: string[];
  highlights?: string[];
};

export const experience = [
  {
    title: "Founder and Lead Engineer",
    organization: "Kasel Digital Solutions Limited",
    period: "2022 to Present",
    type: "Consulting",
    summary:
      "Product and engineering leadership across full-stack platforms, cross-platform mobile delivery, EdTech, HealthTech, and client delivery. Responsible for architecture, implementation, and deployment across every engagement.",
    evidence: ["Asele", "TeachEasy LMS", "Reframe Mobile", "Supabase-backed product systems"],
    highlights: [
      "Led end-to-end product architecture on Asele, a privacy-conscious women's wellness platform using React, TypeScript, Supabase, PostgreSQL RLS, Capacitor, Firebase push notifications, Android production release, and Apple App Store release",
      "Designed and delivered TeachEasy LMS with academy tenancy, role-based portals, PostgreSQL row-level security, recurring scheduling, Jitsi classrooms, real-time collaboration, assessments, and Resend email tracking",
      "Converted a CMS-driven web platform (Reframe) into cross-platform iOS and Android applications using Capacitor and shared API architecture",
      "Managed full delivery lifecycle: requirements, architecture, implementation, testing, and production deployment",
    ],
  },
  {
    title: "Python Curriculum Lead and Instructor",
    organization: "LearnEasy Academy and partner programs",
    period: "2021 to Present",
    type: "Instruction",
    summary:
      "Curriculum design and coding instruction for young learners and beginner programmers across structured K-12 programs. Built teaching tools and learning workflows alongside instruction.",
    evidence: ["K-12 coding tutoring", "Project-based curriculum", "Parent and student support"],
    highlights: [
      "Designed structured Python curriculum for K-12 learners",
      "Built browser-based teaching tools to support learning workflows (Python Playground, Block-to-Code Bridge)",
      "Provided one-to-one and group instruction with documented learner progress",
    ],
  },
] satisfies ExperienceEntry[];

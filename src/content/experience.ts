export type ExperienceEntry = {
  title: string;
  organization: string;
  period: string;
  summary: string;
  evidence: string[];
};

export const experience = [
  {
    title: "Founder and Lead Engineer",
    organization: "Kasel Consults",
    period: "2022 - Present",
    summary: "Product and engineering leadership across full-stack, mobile, EdTech, HealthTech, and client delivery.",
    evidence: ["Asele", "TeachEasy", "Reframe", "Supabase-backed product systems"],
  },
  {
    title: "Python Curriculum Lead and Instructor",
    organization: "Independent and partner learning programs",
    period: "2021 - Present",
    summary: "Curriculum design and instruction for young learners and beginner programmers.",
    evidence: ["K-12 tutoring workflows", "Project-based curriculum", "Parent and student support"],
  },
] satisfies ExperienceEntry[];


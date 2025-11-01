"use client";
import CourseHeroSection from "../../../components/course/CourseHero";
import StatsSection from "../../../components/course/CourseStats";
import CurriculumSection from "../../../components/course/Curriculum";
import TestimonialSection from "../../../components/course/Testimonial";

export default function FreelancingCalculatorPage() {
  const freelancingHeroData = {
    tags: [
      {
        label: "Premium Course",
        bgColor: "bg-yellow-500/20",
        borderColor: "border-yellow-500",
      },
      {
        label: "Live",
        bgColor: "bg-red-600/20",
        borderColor: "border-red-500",
      },
      {
        label: "Upcoming",
        bgColor: "bg-blue-600/20",
        borderColor: "border-blue-500",
      },
    ],
    title: "3F - Master the Freedom Freelancing Formula",
    subtitle: "",
    description:
      "",
    buttonText: "কোর্সটি তে ভর্তি বন্ধ আছে",
    buttonHref: "/enroll/3F-FORMULA", // dynamic href
    currentPrice: "৳50000",
    originalPrice: "",
    discountPercentage: "",
    videoId: "zpKPR0J5GII",
    videoTitle: "Sales And Marketing Tips",
  };

  const communicationStats = [
    { value: "10+", label: "Students Enrolled" },
    { value: "Live", label: "Lessons" },
    { value: "1 Class", label: "Every Week" },
    { value: "Expert", label: "Level" },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <CourseHeroSection {...freelancingHeroData} />

      {/* Stats Section */}
      <StatsSection stats={communicationStats} />

      {/* Curriculum Section */}
      <CurriculumSection course_id="3F-FORMULA" />

      {/* Testimonial Sections */}
      <TestimonialSection />

      {/* Course Features Section */}
    </div>
  );
}

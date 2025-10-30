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
    ],
    title: "Google Ads Conversion Tracking",
    subtitle: "",
    description:
      "Google Ads Conversion Tracking For Lead Generation + Live Support ( Preorder Booking )",
    buttonText: "কোর্সটি তে ভর্তি হন",
    buttonHref: "/courses/freelancing-client-comm/enroll", // Example dynamic href
    currentPrice: "৳1490",
    originalPrice: "৳3000",
    discountPercentage: "50% Discount",
    videoId: "zpKPR0J5GII",
    videoTitle: "Sales And Marketing Tips",
  };

  const communicationStats = [
    { value: "40+", label: "Students Enrolled" },
    { value: "Live", label: "Lessons" },
    { value: "2 Class", label: "Every Week" },
    { value: "Intermediate", label: "Level" },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <CourseHeroSection {...freelancingHeroData} />

      {/* Stats Section */}
      <StatsSection stats={communicationStats} />

      {/* Curriculum Section */}
      <CurriculumSection course_id="GADS-TRACK" />

      {/* Testimonial Sections */}
      <TestimonialSection />

      {/* Course Features Section */}
    </div>
  );
}

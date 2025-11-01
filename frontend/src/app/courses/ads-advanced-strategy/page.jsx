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
        label: "Recorded",
        bgColor: "bg-red-600/20",
        borderColor: "border-red-500",
      },
    ],
    title: "Google Ads Advanced Strategy and Optimization Course - Become a Pro! For Advanced Learners Only",
    subtitle: "কোর্সটি মূলত কাদের জন্য?",
    description:
      "Google Ads Advanced Strategy and Optimization কোর্সে আমি গুগল অ্যাডস অপটিমাইজেশনের মৌলিক থেকে অ্যাডভান্সড কৌশলগুলো শিখিয়েছি, যা আপনার ক্লায়েন্টের ক্যাম্পেইনগুলিকে কম খরচে আরও বেশি কনভার্সন আনতে সাহায্য করবে, ইনশা আল্লাহ। তবে, যারা গুগল এডস সম্পর্কে একেবারেই জানেন না বা গুগল এডস নিয়ে কোনো বেসিক কোর্স করেননি, তাদের জন্য এই কোর্সটি উপযুক্ত নয়।",
    buttonText: "কোর্সটি তে ভর্তি হন",
    buttonHref: "/enroll/GADS-CONV", // dynamic href
    currentPrice: "৳1990",
    originalPrice: "৳2500",
    discountPercentage: "10% Discount",
    videoId: "MTvNs6Dm0S4",
    videoTitle: "Google Ads Optimization কাদের জন্য?",
  };

  const communicationStats = [
    { value: "150+", label: "Students Enrolled" },
    { value: "33", label: "Lessons" },
    { value: "8h 9m", label: "Course Duration" },
    { value: "Intermediate", label: "Level" },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <CourseHeroSection {...freelancingHeroData} />

      {/* Stats Section */}
      <StatsSection stats={communicationStats} />

      {/* Curriculum Section */}
      <CurriculumSection course_id="GADS-CONV" />

      {/* Testimonial Sections */}
      <TestimonialSection />

      {/* Course Features Section */}
    </div>
  );
}

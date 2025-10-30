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
    title: "Freelancing Client Communication",
    subtitle: "কোর্সটির মূল উদ্দেশ্য কী?",
    description:
      "ফ্রিল্যান্সিং ইন্ডাস্ট্রিতে, আমাদের বাংলাদেশী ফ্রিল্যান্সারদের সবচেয়ে বড় চ্যালেঞ্জ হলো USA, UK, Canada, Germany, Netherland এর মতো দেশের বায়ারদের সাথে সঠিকভাবে কমিউনিকেশন করা। কাজের ডিটেইলস ঠিকমতো না বুঝে কাজ নিলে পরে অনেক সমস্যা হয়, তাই ক্লায়েন্টের সঠিক কমিউনিকেশনটা খুবই গুরুত্বপূর্ণ। এই কারণেই আমি তৈরি করেছি এই Freelancing Client Communication কোর্সটি, এই কোর্সটি আমি আমার নিজের কয়েক বছরের রিয়েল এক্সপেরিয়েন্স দিয়ে সাজিয়েছি।",
    buttonText: "কোর্সটি তে ভর্তি হন",
    buttonHref: "/courses/freelancing-client-comm/enroll", // Example dynamic href
    currentPrice: "৳1990",
    originalPrice: "৳5000",
    discountPercentage: "60% Discount",
    videoId: "rXkeA2SQ510",
    videoTitle: "আমাদের কোর্স কেনার উপায়",
  };

  const communicationStats = [
    { value: "500+", label: "Students Enrolled" },
    { value: "60", label: "Lessons" },
    { value: "12h 30m", label: "Course Duration" },
    { value: "All", label: "Level" },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <CourseHeroSection {...freelancingHeroData} />

      {/* Stats Section */}
      <StatsSection stats={communicationStats} />

      {/* Curriculum Section */}
      <CurriculumSection course_id="CLIENT-COMM" />

      {/* Testimonial Sections */}
      <TestimonialSection />

      {/* Course Features Section */}
    </div>
  );
}

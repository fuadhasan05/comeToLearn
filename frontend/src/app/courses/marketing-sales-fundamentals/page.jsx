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
    title: "Fundamental of Marketing & Sales",
    subtitle: "কোর্সটি মূলত কাদের জন্য?",
    description:
      "Fundamental of Marketing and Sales কোর্সে আপনি মার্কেটিং ও সেলসের ফান্ডামেন্টাল বিষয়গুলো শিখবেন, যা শুধুমাত্র Fiverr বা Upwork-এর জন্য সীমাবদ্ধ নয়। আমার শেয়ার করা কার্যকরী টিপস ও ট্রিকস সঠিকভাবে প্রয়োগ করলে আপনি অনলাইন মার্কেটপ্লেসের বাইরেও ক্লায়েন্ট পেতে পারেন। এমনকি যেকোনো ফিজিক্যাল ব্যবসায় এই কৌশলগুলো ব্যবহার করে ভালো ফলাফল আনতে পারবেন ইনশাআল্লাহ। সঠিক কৌশল জানা থাকলে সফলতা অর্জন করা সম্ভব!",
    buttonText: "কোর্সটি তে ভর্তি হন",
    buttonHref: "/courses/freelancing-client-comm/enroll", // Example dynamic href
    currentPrice: "৳99",
    originalPrice: "৳5000",
    discountPercentage: "98% Discount",
    videoId: "6rnivGQXOXI",
    videoTitle: "Sales And Marketing Tips",
  };

  const communicationStats = [
    { value: "150+", label: "Students Enrolled" },
    { value: "19", label: "Lessons" },
    { value: "3h 55m", label: "Course Duration" },
    { value: "Intermediate", label: "Level" },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <CourseHeroSection {...freelancingHeroData} />

      {/* Stats Section */}
      <StatsSection stats={communicationStats} />

      {/* Curriculum Section */}
      <CurriculumSection course_id="MARK-SALES" />

      {/* Testimonial Sections */}
      <TestimonialSection />

      {/* Course Features Section */}
    </div>
  );
}

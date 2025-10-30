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
    title: "Total Freelancing Package",
    subtitle: "কোর্সটির মূল উদ্দেশ্য কী?",
    description:
      "বর্তমান বাংলাদেশের আইটি প্রেক্ষাপটে অনেক প্রতিষ্ঠান আছে যারা ফ্রিল্যান্সিং শেখানোর নামে পুরোপুরি ডিজিটাল মার্কেটিং শেখানোর চেষ্টা করে। কিন্তু এইভাবে শেখানোর ফলে অনেক শিক্ষার্থী তাদের সঠিক দক্ষতা খুঁজে পায় না এবং বুঝতে পারে না কোন বিষয়ে তারা এক্সপার্টহবে। এই কারণেই আমি Google Ads এর উপর কাজ করি এবং একটি বিশেষ কোর্স পরিচালনা করি। এই কোর্সে আপনি শুধু Google Ads শিখবেন না, বরং Fiverr এবং Upwork এর মতো মার্কেটপ্লেসগুলো থেকে কিভাবে Google Ads সার্ভিস বিক্রি করে ইনকাম জেনারেট করা যায়, তা শেখানো হবে। ইনশাআল্লাহ, আমি শুরু থেকে শেষ পর্যন্ত আপনার পাশে থাকবো এবং আপনাকে ফ্রিল্যান্সিং ক্যারিয়ারে সফলতার পথে গাইড করবো।",
    buttonText: "কোর্সটি তে ভর্তি হন",
    buttonHref: "/courses/freelancing-client-comm/enroll", // Example dynamic href
    currentPrice: "৳2990",
    originalPrice: "৳5000",
    discountPercentage: "40% Discount",
    videoId: "d1J7Fa8ZBXo",
    videoTitle: "Total Freelancing Package",
  };

  const communicationStats = [
    { value: "500+", label: "Students Enrolled" },
    { value: "60", label: "Lessons" },
    { value: "12h 30m", label: "Course Duration" },
    { value: "Beginner", label: "Level" },
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

"use client";
import { CheckCircle, TrendingUp } from "lucide-react";
import CourseHeroSection from "../../../components/course/CourseHero";
import StatsSection from "../../../components/course/CourseStats";
import CurriculumSection from "../../../components/course/Curriculum";
import TestimonialSection from "../../../components/course/Testimonial";

  export default function GoogleAdsBasicPage() {
  const courseFeatures = [
    "Google Ads সম্পর্কে ক্লিয়ার একটা ধারণা পাবেন",
    "Google Ads সম্পর্কে সকল ভয় ভীতি দূর হবে",
    "কিভাবে Google Ads শুরু করবেন তার একটা রাস্তা খুঁজে পাবেন",
    "এই কোর্সটি করার পর আপনাকে কেউ ধোকা দিতে পারবে না",
    "কোর্সটি চলাকালীন বা শেষেও WhatsApp ফ্রি সাপোর্ট পাবেন",
    "Google Ads জীবনের সকল হিসাব মিলাতে পারবেন",
  ];

  const freelancingHeroData = {
    tags: [
      {
        label: "10Tk Course",
        bgColor: "bg-yellow-500/20",
        borderColor: "border-yellow-500",
      },
      {
        label: "Recorded",
        bgColor: "bg-red-600/20",
        borderColor: "border-red-500",
      },
    ],
    title:
      "Google Ads Basic Course for Beginners - Kickstart Your Freelancing Career",
    subtitle: "Google Ads কি আপনার জন্য উপযুক্ত? জেনে নিন মাত্র ১০টাকায়",
    description: "",
    buttonText: "১০ টাকা দিয়ে এখনই কোর্স করুন",
    buttonHref: "/enroll/GADS-010", // Example dynamic href
    currentPrice: "৳10",
    originalPrice: "",
    discountPercentage: "",
    videoId: "gAC_PXe1YvU",
    videoTitle: "Total Freelancing Package",
  };

  const communicationStats = [
    { value: "1000+", label: "Students Enrolled" },
    { value: "44", label: "Lessons" },
    { value: "7h 34m", label: "Course Duration" },
    { value: "Beginner", label: "Level" },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <CourseHeroSection {...freelancingHeroData} />

      {/* Stats Section */}
      <StatsSection stats={communicationStats} />

      {/* Value Proposition Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-xl p-8 md:p-12 text-center shadow-xl">
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-bold mb-10 leading-tight">
              নিজেকে গড়ার শুরুটায় হোক সঠিকভাবে!
            </h2>
            {/* Highlight Box */}
            <div className="bg-black/60 border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:bg-black/70">
              <div className="flex items-center justify-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-yellow-500" />
                <h3 className="text-2xl font-semibold">
                  মাত্র ১০ টাকার কোর্স করেই খুঁজে নিন
                </h3>
              </div>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                ফ্রিল্যান্সিংয়ে আপনার সম্ভাবনা কতটুকু
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modul Section */}
      <CurriculumSection course_id="GADS-010" />

      {/* Testimonial Sections */}
      <TestimonialSection />

      {/* Course Features Section */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 bg-white text-black">
        {/* Section Header */}
        <h1 className="text-3xl text-red-600 md:text-5xl text-center font-bold mb-12">
          এই কোর্সটি কেন আপনার করা উচিত?
        </h1>

        <div className="max-w-4xl mx-auto">
          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-black text-white rounded-lg p-6 sm:p-8 flex items-start gap-4 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
              >
                <CheckCircle className="w-7 h-7 text-red-500 shrink-0 mt-1" />
                <p className="text-base sm:text-lg leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

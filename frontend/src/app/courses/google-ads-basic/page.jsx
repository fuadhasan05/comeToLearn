"use client";
import {
  Star,
  Clock,
  Users,
  CheckCircle,
  TrendingUp,
  ShoppingCart,
  ChartLine,
} from "lucide-react";
import Button from "../../../components/ui/Button";
import dynamic from "next/dynamic";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import CurriculumSection from "../../../components/course/Curriculum";

const LiteYouTubeEmbed = dynamic(() => import("react-lite-youtube-embed"), {
  ssr: false,
});

export default function GoogleAdsBasicPage() {
  const courseFeatures = [
    "Google Ads সম্পর্কে ক্লিয়ার একটা ধারণা পাবেন",
    "Google Ads সম্পর্কে সকল ভয় ভীতি দূর হবে",
    "কিভাবে Google Ads শুরু করবেন তার একটা রাস্তা খুঁজে পাবেন",
    "এই কোর্সটি করার পর আপনাকে কেউ ধোকা দিতে পারবে না",
    "কোর্সটি চলাকালীন বা শেষেও WhatsApp ফ্রি সাপোর্ট পাবেন",
    "Google Ads জীবনের সকল হিসাব মিলাতে পারবেন",
  ];

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          {/* Left Content */}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              2. Google Ads Basic Course for Beginners
            </h1>

            <h2 className="text-2xl md:text-4xl font-bold text-yellow-600 mb-4 leading-tight">
              Google Ads কি আপনার জন্য উপযুক্ত?
              <br />
              <span className="text-black">জেনে নিন মাত্র ১০ টাকায়</span>
            </h2>

            <Button
              href="/all-courses"
              variant="primary"
              size="md"
              className="inline-flex items-center"
              icon={ShoppingCart}
            >
              ১০ টাকা দিয়ে এখনই কোর্স করুন
            </Button>
          </div>

          {/* Right Video */}
          <div className="flex justify-center">
            <div className="w-full max-w-3xl rounded-md overflow-hidden border-2 border-red-700 bg-gray-900 aspect-video">
              <LiteYouTubeEmbed
                id="TRjvfHxGCqM"
                title="আমাদের কোর্স কেনার উপায়"
                poster="maxresdefault"
                noCookie
                adNetwork={false}
                params="controls=0&modestbranding=1&rel=0&showinfo=0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-gray-100 rounded-lg p-6 border border-gray-200">
              <Users className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-black mb-2">1000+</div>
              <div className="text-gray-600 text-sm">Students Enrolled</div>
            </div>
            <div className="text-center bg-gray-100 rounded-lg p-6 border border-gray-200">
              <Star className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-black mb-2">5.0</div>
              <div className="text-gray-600 text-sm">Course Rating</div>
            </div>
            <div className="text-center bg-gray-100 rounded-lg p-6 border border-gray-200">
              <Clock className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-black mb-2">7h 34m</div>
              <div className="text-gray-600 text-sm">Course Duration</div>
            </div>
            <div className="text-center bg-gray-100 rounded-lg p-6 border border-gray-200">
              <ChartLine className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-black mb-2">Beginner</div>
              <div className="text-gray-600 text-sm">Level</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-8 md:p-12 text-center shadow-lg">
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-bold mb-10 leading-tight text-gray-900">
              নিজেকে গড়ার শুরুটায় হোক সঠিকভাবে!
            </h2>
            {/* Highlight Box */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:bg-gray-50">
              <div className="flex items-center justify-center gap-3 mb-4 text-gray-900">
                <TrendingUp className="w-8 h-8 text-yellow-500" />
                <h3 className="text-2xl font-semibold">
                  মাত্র ১০ টাকার কোর্স করেই খুঁজে নিন
                </h3>
              </div>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                ফ্রিল্যান্সিংয়ে আপনার সম্ভাবনা কতটুকু
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modul Section */}
      <CurriculumSection course_id="GADS-010" />

      {/* Testimonial Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          {/* Testimonial */}
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-8 sm:p-12 shadow-lg transition-all duration-300 hover:bg-gray-800/70">
            <p className="text-2xl sm:text-3xl font-semibold text-gray-100 leading-relaxed">
              আমি চাই, আপনি সঠিক পথে এগিয়ে{" "}
              <span className="text-red-500 font-bold">
                একজন সফল ফ্রিল্যান্সার
              </span>{" "}
              হয়ে উঠুন। বিগত পাঁচ বছরের ফ্রিল্যান্সিং অভিজ্ঞতা থেকে অর্জিত জ্ঞান
              ও বাস্তব অভিজ্ঞতার আলোকে আমি এই কোর্সটি সাজিয়েছি।
            </p>
          </div>
        </div>
      </section>

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

"use client";
import { useState } from "react";
import { Clock, Users, ShoppingCart, ChartLine, Youtube } from "lucide-react";
import Button from "../../../components/ui/Button";
import dynamic from "next/dynamic";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import CurriculumSection from "../../../components/course/Curriculum";

const LiteYouTubeEmbed = dynamic(() => import("react-lite-youtube-embed"), {
  ssr: false,
});

export default function FreelancingCalculatorPage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-start gap-10">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Total Freelancing Package
            </h1>

            <h2 className="text-2xl md:text-4xl font-bold text-yellow-600 mb-4 leading-tight">
              শুধুমাত্র Google Ads কেন?
            </h2>

            {/* Only this content expands */}
            <div className="relative text-left">
              <p
                className={`text-lg md:text-xl text-white mb-4 leading-relaxed transition-all duration-300 ${
                  expanded ? "max-h-[1000px]" : "max-h-34 overflow-hidden"
                }`}
              >
                বর্তমান বাংলাদেশের আইটি প্রেক্ষাপটে অনেক প্রতিষ্ঠান আছে যারা
                ফ্রিল্যান্সিং শেখানোর নামে পুরোপুরি ডিজিটাল মার্কেটিং শেখানোর
                চেষ্টা করে। কিন্তু এইভাবে শেখানোর ফলে অনেক শিক্ষার্থী তাদের সঠিক
                দক্ষতা খুঁজে পায় না এবং বুঝতে পারে না কোন বিষয়ে তারা এক্সপার্ট
                হবে। এই কারণেই আমি Google Ads এর উপর কাজ করি এবং একটি বিশেষ
                কোর্স পরিচালনা করি। এই কোর্সে আপনি শুধু Google Ads শিখবেন না,
                বরং Fiverr এবং Upwork এর মতো মার্কেটপ্লেসগুলো থেকে কিভাবে Google
                Ads সার্ভিস বিক্রি করে ইনকাম জেনারেট করা যায়, তা শেখানো হবে।
                ইনশাআল্লাহ, আমি শুরু থেকে শেষ পর্যন্ত আপনার পাশে থাকবো এবং
                আপনাকে ফ্রিল্যান্সিং ক্যারিয়ারে সফলতার পথে গাইড করবো।
              </p>

              {/* Gradient Fade Effect */}
              {!expanded && (
                <div className="absolute bottom-8 left-0 w-full h-16 bg-linear-to-t from-black/90 to-transparent pointer-events-none" />
              )}

              <button
                onClick={() => setExpanded(!expanded)}
                className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors relative z-10 cursor-pointer"
              >
                {expanded ? "See less ▲" : "See more ▼"}
              </button>
            </div>

            {/* CTA Button - Left aligned and fixed size */}
            <div className="flex justify-start mt-6">
              <Button
                href="/all-courses"
                variant="primary"
                size="md"
                icon={ShoppingCart}
              >
                কোর্সটি তে ভর্তি হন
              </Button>
            </div>
          </div>

          {/* Right Video */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-3xl rounded-md overflow-hidden border-2 border-red-700 bg-gray-900 aspect-video">
              <LiteYouTubeEmbed
                id="d1J7Fa8ZBXo"
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-black/50 rounded-lg p-6 border border-gray-800">
              <Users className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400 text-sm">Students Enrolled</div>
            </div>
            <div className="text-center bg-black/50 rounded-lg p-6 border border-gray-800">
              <Youtube className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">126</div>
              <div className="text-gray-400 text-sm">Lessons</div>
            </div>
            <div className="text-center bg-black/50 rounded-lg p-6 border border-gray-800">
              <Clock className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">62h 30m</div>
              <div className="text-gray-400 text-sm">Course Duration</div>
            </div>
            <div className="text-center bg-black/50 rounded-lg p-6 border border-gray-800">
              <ChartLine className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">Beginner</div>
              <div className="text-gray-400 text-sm">Level</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modul Section */}
      <CurriculumSection course_id="FREE-PKG" />

      {/* Testimonial Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Testimonial */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 sm:p-12 shadow-lg transition-all duration-300 hover:bg-gray-100">
            <p className="text-2xl sm:text-3xl font-semibold text-gray-800 leading-relaxed">
              আমি চাই, আপনি সঠিক পথে এগিয়ে{" "}
              <span className="text-red-600 font-bold">
                একজন সফল ফ্রিল্যান্সার
              </span>{" "}
              হয়ে উঠুন। বিগত পাঁচ বছরের ফ্রিল্যান্সিং অভিজ্ঞতা থেকে অর্জিত
              জ্ঞান ও বাস্তব অভিজ্ঞতার আলোকে আমি এই কোর্সটি সাজিয়েছি।
            </p>
          </div>
        </div>
      </section>

      {/* Course Features Section */}
    </div>
  );
}

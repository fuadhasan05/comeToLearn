"use client";
import { FaBookOpen, FaCheckCircle, FaComments, FaUsers } from "react-icons/fa";
import dynamic from "next/dynamic";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const LiteYouTubeEmbed = dynamic(() => import("react-lite-youtube-embed"), {
  ssr: false,
});

const AchievementItem = ({ children }) => (
  <li className="flex items-start space-x-3">
    <span
      className="text-red-700 w-2 h-2 mt-2.5 shrink-0 bg-red-700 rounded-full"
      aria-hidden="true"
    />
    <span className="text-base sm:text-lg text-gray-200">{children}</span>
  </li>
);

// Centralized Data
const ACHIEVEMENTS = [
  "Top-Rated Nominated Freelancer on Fiverr",
  "$50K+ Earned on Fiverr Only",
  "Owner of Unlimited Growth Drive Agency",
  "Generating $5K+/Month in Agency Revenue",
  "Creator of the 'Come to Learn with Samad' YouTube Channel",
  "Successfully Teach 1,000+ Students",
  "Proud Brave Member",
  "5+ Years of Experience in the Freelancing Industry",
];

export default function Banner() {
  return (
    <section className="bg-black text-white min-h-screen flex py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Name & Tagline Badge  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          <div className="border-2 border-red-700 rounded-md px-6 py-3 sm:px-8 sm:py-4 items-center space-x-2 sm:space-x-3 bg-black/50 backdrop-blur-sm">
            <h1 className="flex items-center justify-center gap-2 text-3xl lg:text-5xl font-bold text-white text-center">
              Abdus Samad
              <FaCheckCircle
                className="text-blue-500 text-2xl lg:text-4xl"
                title="Verified"
              />
            </h1>
          </div>

          <div className="border-2 border-yellow-700 rounded-md px-6 py-3 sm:px-8 sm:py-4 bg-black/50 backdrop-blur-sm">
            <h2 className="text-3xl lg:text-5xl font-bold text-white text-center">
              The Different Thinker
            </h2>
          </div>
        </div>

        {/* Achievements List &  Video*/}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* 1. Left Section: Achievements List */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-[#151515] backdrop-blur-sm rounded-md p-6 sm:p-8 border-2 border-yellow-700 h-full">
              <ul className="space-y-1 sm:space-y-2">
                {ACHIEVEMENTS.map((text, index) => (
                  <AchievementItem key={index}>{text}</AchievementItem>
                ))}
              </ul>
            </div>
          </div>

          {/* 2. Right Section: Video */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative rounded-lg overflow-hidden border-2 border-red-700 bg-gray-900 aspect-video">
              <LiteYouTubeEmbed
                id="DglLwXrWmsM"
                title="Who am I? - Abdus Samad"
                poster="maxresdefault"
                noCookie={true}
                adNetwork={false}
                params="controls=0&modestbranding=1&rel=0&showinfo=0"
              />
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12 lg:mt-16">
          {/* Total Learners */}
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-md p-4 text-center flex flex-col items-center">
            <FaUsers className="text-yellow-700 text-3xl mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-yellow-700">
              2500+
            </div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">
              Total Learners
            </div>
          </div>

          {/* Student Feedback */}
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-md p-4 text-center flex flex-col items-center">
            <FaComments className="text-yellow-700 text-3xl mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-yellow-700">
              500+
            </div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">
              Student Feedback
            </div>
          </div>

          {/* Course Published */}
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-md p-4 text-center flex flex-col items-center">
            <FaBookOpen className="text-yellow-700 text-3xl mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-yellow-700">
              8
            </div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">
              Course Published
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

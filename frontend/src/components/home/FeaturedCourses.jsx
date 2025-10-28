"use client";
import { useEffect, useState } from "react";
import CourseCard from "../course/CourseCard";
import Link from "next/link";
import Loading from "../ui/Loading";
import { ArrowRight } from "lucide-react";

export default function FeaturedCourses() {
  const [premiumCourses, setPremiumCourses] = useState([]);

  useEffect(() => {
    // Fetch all courses from your backend API
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => {
        // Filter only Premium Courses
        const premium = data.filter((c) => c.category === "Premium_Course");
        // Show only first 4
        setPremiumCourses(premium.slice(0, 4));
      })
      .catch((err) => console.error("Failed to fetch courses:", err));
  }, []);

  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl lg:text-6xl font-bold text-red-600 mb-16">
            <span className="text-white">Become Pro With </span> Premium course
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {premiumCourses.length > 0 ? (
            premiumCourses.map((course) => (
              <CourseCard key={course.course_id} course={course} />
            ))
          ) : (
            <Loading />
          )}
        </div>

        {/* Show All Button */}
        <div className="flex justify-center mt-16">
          <Link
            href="/all-courses"
            className="inline-flex items-center gap-3 bg-white text-black font-bold text-lg px-10 py-4 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gray-600/50 group"
          >
            Show All Courses
            <ArrowRight
              size={18}
              className="w-6 h-6 sm:w-7 sm:h-7 group-hover:animate-bounce"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

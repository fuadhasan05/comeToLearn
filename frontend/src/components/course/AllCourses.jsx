"use client";
import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import Loading from "../ui/Loading";
import dynamic from "next/dynamic";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import CTASection from "../home/CTASection";

const LiteYouTubeEmbed = dynamic(() => import("react-lite-youtube-embed"), {
  ssr: false,
});

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  if (!courses.length) {
    return (
      <section className="min-h-screen flex justify-center items-center text-white bg-black">
        <p>No courses found.</p>
      </section>
    );
  }

  return (
    <section className="bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl max-w-5xl mx-auto font-bold text-center mb-12">
          কোন কোর্স আগে করবেন?{" "}
          <span className="text-red-700">এই ভিডিও দেখুন</span>
        </h1>
        {/* Hero Video */}
        <div className="relative max-w-4xl mx-auto rounded-md overflow-hidden border-2 border-red-700 bg-gray-900 aspect-video">
          <LiteYouTubeEmbed
            id="AI1lDozOu7Q"
            title="আপনার জন্য আসলে কোন কোর্সটি উপযুক্ত?"
            poster="maxresdefault"
            noCookie={true}
            adNetwork={false}
            params="controls=0&modestbranding=1&rel=0&showinfo=0"
          />
        </div>

        {/* Course Grid */}
        <div className="mt-24">
          <h1 className="text-6xl max-w-5xl mx-auto font-bold text-center mb-16">
            আমার একটিভ <span className="text-red-700">কোর্সসমূহ</span>
          </h1>
          <div className="grid md:grid-cols-4 gap-8">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      </div>

      {/* How to buy */}
      <CTASection />
    </section>
  );
}

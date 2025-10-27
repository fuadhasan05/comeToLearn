"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    axios
      .get(`${API}/api/courses?published=true`)
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load courses. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading courses...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">All Courses</h1>
        <p className="text-lg text-gray-300">
          Learn Freelancing, Web Development, and Digital Marketing — practical, affordable, and beginner-friendly.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {courses.length === 0 && (
          <p className="col-span-full text-gray-400 text-center">
            No courses found.
          </p>
        )}

        {courses.map((course) => (
          <div
            key={course.course_id}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="relative w-full h-52">
              <Image
                src={course.image?.url || "/default-course.jpg"}
                alt={course.image?.alt_text || course.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 flex flex-col justify-between h-56">
              <div>
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                  {course.title}
                </h2>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {course.short_title}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-yellow-400 font-semibold text-lg">
                    {course.is_free ? "Free" : `${course.currency} ${course.price}`}
                  </span>
                </div>

                <Link
                  href={`/courses/${course.course_id}`}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

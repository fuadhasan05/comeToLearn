"use client";
import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import Loading from "../ui/Loading";

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
    <section className="min-h-screen bg-black text-white px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">All Courses</h1>

      <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </section>
  );
}

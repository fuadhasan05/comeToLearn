"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CourseCard({ course }) {
  const courseLink = `/courses/${course.route}`;

  return (
    <div className="bg-white rounded-md shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 overflow-hidden border border-gray-200">
      {/* Thumbnail */}
      <div className="relative w-full h-42">
        <Image
          src={course.image?.url || "/default-course.jpg"}
          alt={course.image?.alt_text || course.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between text-black">
        {/* Title */}
        <Link href={courseLink}>
          <h2 className="text-lg font-semibold mb-2">
            {course.title || short_title}
          </h2>
        </Link>

        {/* Price Section */}
        <div className="mb-4">
          {course.is_free ? (
            <p className="text-green-600 font-semibold">Free</p>
          ) : course.price?.is_discounted ? (
            <p className="text-gray-700">
              <span className="text-red-500 line-through mr-2">
                ৳{course.price.original}
              </span>
              <span className="text-green-600 font-bold">
                ৳{course.price.discounted}
              </span>
              <span className="text-yellow-500 text-sm ml-2">
                ({course.price.discount_percentage}% off)
              </span>
            </p>
          ) : (
            <p className="text-gray-800 font-bold">
              ৳{course.price?.original} {course.price?.currency}
            </p>
          )}
        </div>

        {/* View Details Button */}
        <Link
          href={courseLink}
          className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-700 text-white font-medium rounded-lg px-4 py-2 transition-colors"
        >
          View Details <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";

export default function CourseCard({ course }) {
  const courseLink = `/courses/${course.route}`;

  // Destructure price data for cleaner logic
  const { price, is_free, title, short_title } = course;

  const originalPrice = price?.original;
  const discountedPrice = price?.discounted;
  const isDiscounted = price?.is_discounted;
  const discountPercentage = price?.discount_percentage;

  return (
    <div className="bg-white rounded-md shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video">
        <Image
          src={course.image?.url || "/default-course.jpg"}
          alt={course.image?.alt_text || title}
          fill
          className="object-cover"
          sizes="(max-width: 600px) 100vw, 33vw"
        />
      </div>

      {/* Content Area: Made to grow vertically */}
      <div className="p-4 flex flex-col grow text-black">
        {/* Title and Price Wrapper: Pushes button down */}
        <div className="grow">
          {/* Title */}
          <Link href={courseLink}>
            <h2 className="text-lg font-semibold mb-2 hover:text-red-700 transition-colors leading-snug">
              {title || short_title}
            </h2>
          </Link>

          {/* === PRICE SECTION === */}
          <div className="mt-3 mb-4">
            {is_free ? (
              // Case 1: FREE Course
              <p className="text-green-600 font-bold text-xl">Free</p>
            ) : isDiscounted && discountedPrice !== undefined ? (
              // Case 2: DISCOUNTED Price
              <p className="text-gray-700 flex items-center">
                {/* Original Price (Strikethrough) */}
                <span className="text-red-500 line-through text-base mr-2">
                  ৳{originalPrice}
                </span>
                {/* Discounted Price (Bold and Larger) */}
                <span className="text-green-600 font-bold text-xl mr-2">
                  ৳{discountedPrice}
                </span>
                {/* Discount Percentage */}
                <span className="text-yellow-500 text-sm font-medium">
                  ({discountPercentage}% off)
                </span>
              </p>
            ) : (
              // Case 3: REGULAR Price (No discount, just original price)
              <p className="text-gray-800 font-bold text-xl">
                ৳{originalPrice}
              </p>
            )}
          </div>
        </div>

        {/* View Details Button (Fixed at bottom) */}
        <Button
          href={courseLink}
          variant="secondary"
          size="sm"
          className="inline-flex items-center"
          icon={ArrowRight}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}

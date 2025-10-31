"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // Re-added Next Image
import { useAuth } from "@/context/AuthContext";

// Define the API root once
const API_ROOT = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Helper to fetch course data by ID/Slug
 */
const fetchCourseData = async (courseId) => {
  if (!API_ROOT || !courseId) return null;

  try {
    let res = await fetch(`${API_ROOT}/api/courses/${courseId}`);

    if (res.ok) {
      return await res.json();
    }

    if (res.status === 404) {
      const listRes = await fetch(`${API_ROOT}/api/courses/`);
      if (!listRes.ok) return null;

      const list = await listRes.json();
      const found = list.find(
        (c) =>
          c.course_id === courseId || c._id === courseId || c.route === courseId
      );
      return found || null;
    }
  } catch (err) {
    console.error("Failed to fetch course data:", err);
  }
  return null;
};

// Define default image source and dimensions for Next/Image
const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600";
const IMAGE_WIDTH = 144; // 36 * 4
const IMAGE_HEIGHT = 96; // 24 * 4

export default function EnrollPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);

  // --- Static Discount (based on original design placeholder) ---
  const STATIC_PROMO_DISCOUNT = 275;

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      const data = await fetchCourseData(courseId);
      setCourse(data);
      setLoading(false);
    };
    loadCourse();
  }, [courseId]);

  const priceOriginal = course?.price?.original ?? course?.price ?? 0;
  const priceDiscounted =
    course?.price?.discounted ?? course?.discounted ?? priceOriginal;
  const currency = course?.price?.currency ?? "৳";

  // Calculate final payment using the static discount
  const totalPayment = Math.max(
    (priceDiscounted || priceOriginal) - STATIC_PROMO_DISCOUNT,
    0
  );

  const handleEnroll = useCallback(async () => {
    setError("");
    if (!user) {
      return router.replace("/auth/login");
    }
    if (isEnrolled || enrolling) return;

    setEnrolling(true);
    try {
      const res = await fetch(`${API_ROOT}/api/enrollments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.uid,
          courseId,
          userName: user?.displayName || "",
          userEmail: user?.email || "",
          // Note: Static promo code is NOT sent as it's not user-applied,
          // but totalPayment is sent.
          finalPrice: totalPayment,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "এনরোলমেন্ট ব্যর্থ হয়েছে।");
      }

      setIsEnrolled(true);
      router.replace(`/courses/${courseId}`);
    } catch (err) {
      setError(err.message || "এনরোলমেন্ট সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
    } finally {
      setEnrolling(false);
    }
  }, [user, courseId, enrolling, isEnrolled, router, totalPayment]);

  // --- Loading and Not Found UI ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-600">কোর্সের তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            দুঃখিত! কোর্সটি খুঁজে পাওয়া যায়নি।
          </h2>
          <Link
            href="/all-courses"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            সকল কোর্সে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/all-courses"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 font-medium transition duration-150"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M15 18l-6-6 6-6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          সকল কোর্সে ফিরে যান
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Course/payment details card */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex gap-6 items-center flex-wrap sm:flex-nowrap">
                {/* Replaced <img> with Next/Image for optimization */}
                <Image
                  src={course?.image?.url || DEFAULT_IMAGE_URL}
                  alt={course?.image?.alt_text || course?.title || "Course"}
                  width={IMAGE_WIDTH}
                  height={IMAGE_HEIGHT}
                  className="w-full h-32 sm:w-36 sm:h-24 object-cover rounded-md border shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold ">
                    {course.title || `Course ${courseId}`}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 truncate">
                    {course.short_title ||
                      course.description ||
                      "Course details."}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm text-gray-500">কোর্সের মূল্য</div>
                  <div
                    className={`text-2xl font-bold ${
                      priceDiscounted < priceOriginal
                        ? "text-red-600"
                        : "text-gray-900"
                    }`}
                  >
                    {currency}
                    {priceDiscounted}
                  </div>
                  {priceDiscounted < priceOriginal && (
                    <div className="text-xs text-gray-400 line-through">
                      {currency}
                      {priceOriginal}
                    </div>
                  )}
                </div>
              </div>

              {/* Static Discount Row (Placeholder) */}
              {/* <div className="mt-6 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded bg-green-50 text-green-700 text-sm font-semibold">
                      STATIC275
                    </div>
                    <div className="text-sm text-gray-600">বিশেষ ডিসকাউন্ট</div>
                  </div>
                  <div className="text-sm font-semibold text-red-600">
                    - {currency}
                    {STATIC_PROMO_DISCOUNT}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 border-t pt-4 border-gray-200">
                  <div className="text-xl font-bold">টোটাল পেমেন্ট:</div>
                  <div className="text-3xl font-extrabold text-indigo-600">
                    {currency}
                    {totalPayment}
                  </div>
                </div>
              </div> */}

            </div>

            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h4 className="text-lg font-semibold mb-3">
                পেমেন্ট নির্দেশনা 📞
              </h4>
              <p className="text-sm text-gray-600">
                পেমেন্ট সংক্রান্ত যেকোন প্রয়োজনে অনুগ্রহ করে কল করুন{" "}
                <a
                  className="text-red-600 font-bold hover:text-red-700 transition duration-150"
                  href="tel:+88012345679"
                >
                  +88012345679
                </a>{" "}
                (সকাল ১০টা থেকে রাত ১০টা পর্যন্ত)
              </p>
            </div>
          </div>

          {/* Right Column: Payment methods & CTA */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-6">
              <h4 className="text-xl font-bold mb-4">আপনার অর্ডার</h4>

              <form>
                {/* Payment Method Selection (Placeholder) */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    পেমেন্টের মাধ্যম নির্বাচন করুন:
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                    defaultValue="bKash" // Example default value
                    aria-label="Payment Method"
                  >
                    <option value="bKash">বিকাশ (bKash)</option>
                    <option value="Nagad">নগদ (Nagad)</option>
                    <option value="Rocket">রকেট (Rocket)</option>
                    <option value="Card" disabled>
                      কার্ড পেমেন্ট (শীঘ্রই আসছে)
                    </option>
                  </select>
                </div>

                <div className="mt-6 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-lg text-gray-600 font-semibold">
                      মোট পেমেন্ট:
                    </div>
                    <div className="text-3xl font-extrabold text-indigo-600">
                      {currency}
                      {totalPayment}
                    </div>
                  </div>

                  {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-sm text-red-700 rounded-lg">
                      **ত্রুটি:** {error}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleEnroll}
                    disabled={enrolling || isEnrolled}
                    className="mt-5 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg shadow-md transition duration-150 transform hover:scale-[1.01] disabled:opacity-60 disabled:shadow-none"
                  >
                    {enrolling
                      ? "এনরোলমেন্ট প্রক্রিয়া চলছে..."
                      : isEnrolled
                        ? "✅ সফলভাবে এনরোলড"
                        : "পেমেন্ট সম্পন্ন করুন"}
                  </button>

                  <div className="mt-3 text-xs text-gray-500 flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>আপনার পেমেন্ট **১০০% সুরক্ষিত**</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

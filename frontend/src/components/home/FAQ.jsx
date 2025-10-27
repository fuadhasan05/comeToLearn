"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "আমি কি মোবাইল দিয়ে কাজ করতে পারবো?",
    answer:
      "না, মোবাইল দিয়ে Google Ads এর কাজ করা সম্ভব নয়। প্রফেশনালভাবে কাজ শিখতে ও দক্ষতা অর্জন করতে অবশ্যই ল্যাপটপ বা কম্পিউটার প্রয়োজন।",
  },
  {
    question: "আপনার কোর্সের সাথে অন্যদের পার্থক্য কী?",
    answer:
      "আমি শুধু থিওরি শেখাই না। রিয়েল ক্লায়েন্টের কাজ সরাসরি করে দেখাই এবং ফাইভার একাউন্টের লাইভ চ্যাটও শিক্ষার্থীদের সাথে শেয়ার করি, যাতে বাস্তব অভিজ্ঞতা অর্জন করতে পারেন।",
  },
  {
    question: "আপনার কোনো সফল শিক্ষার্থীর উদাহরণ আছে?",
    answer:
      "অবশ্যই আছে! অনেক শিক্ষার্থী ইতিমধ্যেই সফলভাবে ফ্রিল্যান্সিং করছে। কোর্সে জয়েনের আগে তাদের সাফল্যের উদাহরণ দেখে নিতে পারেন। নিচের লিংকে:",
  },
  {
    question: "আপনি কি ক্লায়েন্টের সাথে মিটিং করে কাজ এনে দেবেন?",
    answer:
      "না, কারণ এতে আপনি পরবর্তীতে মিটিংয়ের জন্য আমার উপর নির্ভরশীল হয়ে পড়বেন। বরং, আমি এমনভাবে গাইড করবো যাতে আপনি নিজেই আত্মবিশ্বাসের সাথে ক্লায়েন্টের সাথে মিটিং করে সহজে কাজ নিতে পারেন।",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-6xl font-bold text-center mb-12">
          আপনাদের কমন কিছু প্রশ্নের উত্তর
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center text-left px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="font-medium text-gray-900 text-lg">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <FaChevronUp className="text-red-600" />
                ) : (
                  <FaChevronDown className="text-gray-600" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-5 pb-4 text-gray-700 text-base bg-white">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

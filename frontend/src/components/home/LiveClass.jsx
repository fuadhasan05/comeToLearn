"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function LiveClass() {
  const videos = [
    {
      id: "vhlFFnEBLjY",
      title: "আমার জীবনের সেরা ক্লাস",
      description:
        "একটি অসাধারণ লাইভ সেশন যেখানে আমি আমার জানা সেরা লেসন গুলো শেয়ার করেছি",
    },
    {
      id: "ROjLBhLEEi4",
      title: "Fiverr Full Course",
      description: "Fiverr Full Course in bangla 2026",
    },
    {
      id: "mV9pxjS9MV0",
      title: "Sales and Communication Masterclass",
      description:
        "Sales and Communication Masterclass in Freelancing - Private Video",
    },
  ];

  return (
    <main className="bg-black min-h-screen text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-6xl font-bold text-white mb-8">
            আমার সেরা লাইভ ক্লাসগুলো
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mt-4 text-red-700">
            আমি আমার জীবনের সেরা লেসনগুলো শেয়ার করেছি
          </p>
        </div>

        {/* Videos Grid */}
        <div className="space-y-16">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                index % 2 === 0 ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Video Container */}
              <div
                className={`lg:col-span-7 ${
                  index % 2 === 0 ? "order-1 lg:order-1" : "order-1 lg:order-2"
                }`}
              >
                <div className="relative rounded-md overflow-hidden border-2 border-red-700 bg-gray-900 aspect-video shadow-2xl shadow-red-900/30 hover:shadow-red-900/50 transition-shadow duration-300">
                  <LiteYouTubeEmbed
                    id={video.id}
                    title={video.title}
                    poster="maxresdefault"
                    noCookie={true}
                    adNetwork={false}
                    params="controls=0&modestbranding=1&rel=0&showinfo=0"
                  />
                </div>
              </div>

              {/* Video Description */}
              <div
                className={`lg:col-span-5 ${
                  index % 2 === 0 ? "order-2 lg:order-2" : "order-2 lg:order-1"
                }`}
              >
                <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-md p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-red-600 text-white px-4 py-1 rounded-md text-sm font-semibold">
                      Live Class #{index + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    {video.title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    {video.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="bg-black/50 border border-gray-700 px-4 py-2 rounded-md">
                      <span className="text-yellow-500 font-semibold">
                        ✨ Interactive
                      </span>
                    </div>
                    <div className="bg-black/50 border border-gray-700 px-4 py-2 rounded-md">
                      <span className="text-blue-500 font-semibold">
                        🎓 Educational
                      </span>
                    </div>
                    <div className="bg-black/50 border border-gray-700 px-4 py-2 rounded-md">
                      <span className="text-green-500 font-semibold">
                        💡 Practical
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-linear-to-r from-red-900/20 via-red-800/20 to-red-900/20 border-2 border-red-700 rounded-md p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              আপনিও যোগ দিন আমাদের লাইভ ক্লাসে
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              প্রতিটি লাইভ সেশনে সরাসরি প্রশ্ন করুন এবং রিয়েল-টাইম ফিডব্যাক পান
            </p>
            <a
              href="/live-course"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-10 py-4 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/50"
            >
              ফ্রি লাইভ ক্লাসে এনরোল করুন
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

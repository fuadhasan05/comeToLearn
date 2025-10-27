"use client";
import { ShoppingCart } from "lucide-react";
import dynamic from "next/dynamic";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const LiteYouTubeEmbed = dynamic(() => import("react-lite-youtube-embed"), {
  ssr: false,
});

export default function CTASection() {
  return (
    <section className="bg-white text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="bg-black max-w-7xl mx-auto rounded-md p-24">
        {/* Main Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl lg:text-6xl font-bold text-red-600 mb-4">
            কিভাবে কোর্স কিনবেন?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white">
            Very Simple - দুই মিনিটের এই ভিডিওটি দেখে নিন
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative rounded-lg overflow-hidden border-2 border-red-700 bg-gray-900 aspect-video">
            <LiteYouTubeEmbed
              id="GbGaKHpmHjY"
              title="আমাদের কোর্স কেনার উপায়"
              poster="maxresdefault"
              noCookie={true}
              adNetwork={false}
              params="controls=0&modestbranding=1&rel=0&showinfo=0"
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="/courses/purchase"
            className="inline-flex items-center gap-3 bg-red-700 text-white text-xl px-4 py-2 sm:px-8 sm:py-4 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/50 group"
          >
            <span>Start Your Purchase</span>
            <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 group-hover:animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}

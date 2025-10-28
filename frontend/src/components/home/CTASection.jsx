"use client";
import { ShoppingCart } from "lucide-react";
import dynamic from "next/dynamic";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Button from "../ui/Button";

const LiteYouTubeEmbed = dynamic(() => import("react-lite-youtube-embed"), {
  ssr: false,
});

export default function CTASection() {
  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-4">
          <h2 className="text-3xl lg:text-6xl font-bold text-red-600 mb-4">
            কিভাবে কোর্স কিনবেন?
          </h2>
          <p className="text-lg md:text-2xl text-white">
            Very Simple - দুই মিনিটের এই ভিডিওটি দেখে নিন
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-3xl mx-auto my-16">
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
          <Button
            href="/all-courses"
            variant="primary"
            size="md"
            className="inline-flex items-center"
            icon={ShoppingCart}
          >
            Start Your Purchase
          </Button>
        </div>
      </div>
    </section>
  );
}

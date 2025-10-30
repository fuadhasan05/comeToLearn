"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ShoppingCart } from "lucide-react";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Button from "../ui/Button";

const LiteYouTubeEmbed = dynamic(() => import("react-lite-youtube-embed"), {
  ssr: false,
});

export default function CourseHeroSection({
  tags,
  title,
  subtitle,
  description,
  buttonText,
  buttonHref = "/all-courses", // Default href
  currentPrice,
  originalPrice,
  discountPercentage,
  videoId,
  videoTitle,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-start gap-10">
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          {/* Customizable Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {tags.map((tag, index) => (
              <div
                key={index}
                className={`${tag.bgColor} ${tag.borderColor} text-white px-3 py-1 rounded-full border text-xs font-semibold shadow-md`}
              >
                {tag.label}
              </div>
            ))}
          </div>

          {/* 1. Customizable Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6">{title}</h1>

          {/* Customizable Subtitle */}
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-4 leading-tight">
            {subtitle}
          </h2>

          {/* 2. Customizable Content (with expand/collapse) */}
          <div className="relative text-left">
            <p
              className={`text-lg md:text-xl text-white mb-4 leading-relaxed transition-all duration-300 ${
                expanded ? "max-h-[1000px]" : "max-h-34 overflow-hidden"
              }`}
            >
              {description}
            </p>

            {/* Gradient Fade Effect */}
            {!expanded && (
              <div className="absolute bottom-8 left-0 w-full h-16 bg-linear-to-t from-black/90 to-transparent pointer-events-none" />
            )}

            <button
              onClick={() => setExpanded(!expanded)}
              className="text-yellow-500 font-base hover:text-yellow-400 transition-colors relative z-10 cursor-pointer"
            >
              {expanded ? "See less ▲" : "See more ▼"}
            </button>
          </div>

          {/* CTA Button and 3. Price Block */}
          <div className="flex justify-start mt-6">
            <div className="flex items-center gap-4">
              <Button
                href={buttonHref}
                variant="primary"
                size="md"
                icon={ShoppingCart}
              >
                {buttonText}
              </Button>

              <span className="text-4xl font-extrabold text-green-500">
                {currentPrice}
              </span>
              <div className="flex flex-col items-start text-lg leading-none">
                <span className="line-through text-gray-500">
                  {originalPrice}
                </span>
                <span className="font-bold text-red-500 mt-1">
                  {discountPercentage}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Video (4. Customizable ID & Title) */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-3xl rounded-md overflow-hidden border-2 border-red-700 bg-gray-900 aspect-video">
            <LiteYouTubeEmbed
              id={videoId}
              title={videoTitle}
              poster="maxresdefault"
              noCookie
              adNetwork={false}
              params="controls=0&modestbranding=1&rel=0&showinfo=0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

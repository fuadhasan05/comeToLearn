"use client";

import Link from "next/link";
import { FaFacebook, FaYoutube, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { navData } from "./Navbar";
import { Mail, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        {/* --- Logo & About --- */}
        <div>
          <Link href="/" className="block mb-4">
            <h2 className="text-2xl font-bold text-white">
              ComeToLearn <span className="text-red-700">withSamad</span>
            </h2>
          </Link>
          <p className="text-sm text-gray-400">
            Your full dedication and all my combined experiences will help you
            find your right destination.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-5">
            <Link
              href="https://www.facebook.com/cometolearnwithsamad/"
              target="_blank"
              className="hover:text-red-600 transition"
              aria-label="Facebook"
            >
              <FaFacebook className="text-2xl" />
            </Link>
            <Link
              href="https://www.youtube.com/@Cometolearnwithsamad"
              target="_blank"
              className="hover:text-red-600 transition"
              aria-label="YouTube"
            >
              <FaYoutube className="text-2xl" />
            </Link>
            <Link
              href="https://www.instagram.com/cometolearnwithsamad/"
              target="_blank"
              className="hover:text-red-600 transition"
              aria-label="Instagram"
            >
              <FaInstagram className="text-2xl" />
            </Link>
            <Link
              href="https://api.whatsapp.com/send/?phone=1877273333&text&type=phone_number&app_absent=0"
              target="_blank"
              className="hover:text-red-600 transition"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-2xl" />
            </Link>
          </div>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {navData.mainLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="hover:text-red-600 transition text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {navData.utilityLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="hover:text-red-600 transition text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Legal Info --- */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Legal Info</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Trade Licence No:{" "}
            <span className="text-gray-200 font-medium">
              TRAD/DNCC/02232740/2025
            </span>
            <br />
            E-TIN No:{" "}
            <span className="text-gray-200 font-medium">272157134507</span>
          </p>
        </div>

        {/* --- Contact --- */}
        <div className="space-y-2">
          <h2 className="text-white text-lg font-semibold mb-4">Contact Me</h2>
          <p className=" mb-2 text-sm md:text-base">
            Let’s talk with me to get any help about freelancing.
          </p>
          {/* Address */}
          <div className="flex items-center gap-2">
            <div className="">
              <MapPin className="text-red-600 w-6 h-6" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              404, Hadirmor, Ghoramara-6100,
              <br /> Rajshahi, Bangladesh
            </p>
          </div>
          {/* Email */}
          <div className="flex items-center gap-2">
            <div className="">
              <Mail className="text-red-600 w-6 h-6" />
            </div>
            <a
              href="mailto:freelancerabsamad@gmail.com"
              className="text-gray-400 text-sm hover:text-red-600 transition"
            >
              freelancerabsamad@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} ComeToLearnWithSamad. All rights
          reserved.
        </p>
        <p className="mt-1">Developed by Fuad Hasan 🚀</p>
      </div>
    </footer>
  );
}

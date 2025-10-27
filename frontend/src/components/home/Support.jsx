"use client";
import {
  FaFacebook,
  FaFacebookF,
  FaFacebookMessenger,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export default function Support() {
  return (
    <section className="bg-white text-white pb-24 text-center">
      <div className="max-w-7xl mx-auto px-4 bg-black py-12 rounded-md">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          আমার কাছ থেকে <span className="text-red-700">ফ্রি সাপোর্ট</span> পেতে
          এখনই যুক্ত হোন!
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {/* Facebook Group */}
          <a
            href="https://www.facebook.com/groups/cometolearnwithsamad"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 p-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            <FaFacebookF size={28} />
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/@Cometolearnwithsamad"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 p-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            <FaYoutube size={28} />
          </a>

          {/* Facebook Page */}
          <a
            href="https://www.facebook.com/cometolearnwithsamad/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 p-4 rounded-md hover:bg-blue-500 transition duration-300"
          >
            <FaFacebook size={28} />
          </a>

          {/* WithSamad FB Page */}
          <a
            href="https://www.facebook.com/withsamad/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 p-4 rounded-md hover:bg-blue-400 transition duration-300"
          >
            <FaFacebookMessenger size={28} />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/cometolearnwithsamad/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 p-4 rounded-md hover:bg-pink-500 transition duration-300"
          >
            <FaInstagram size={28} />
          </a>

          {/* WhatsApp */}
          <a
            href="https://api.whatsapp.com/send/?phone=1877273333&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 p-4 rounded-md hover:bg-green-500 transition duration-300"
          >
            <FaWhatsapp size={28} />
          </a>
        </div>

        <p className="mt-10 text-gray-400 text-sm">
          Follow & Join our community to get updates, free guidance, and live
          sessions!
        </p>
      </div>
    </section>
  );
}

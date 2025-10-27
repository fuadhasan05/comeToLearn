import {
  Target,
  Rocket,
  Users,
  Briefcase,
  TrendingUp,
  Award,
  Building2,
  Zap,
} from "lucide-react";

export default function MissionVisionSection() {
  const visionItems = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "৫০,০০০ মানুষকে আত্মনির্ভরশীল",
      description: "প্রত্যক্ষ ও পরোক্ষভাবে সাহায্য করা",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "৫০০ জন চাকরির সুযোগ",
      description: "আমার কোম্পানিতে চাকরির সুযোগ দেওয়া",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Impactful কাজ",
      description: "সমাজে প্রভাবশালী কাজ করে যাওয়া",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: '"রোলস রয়েস" মান',
      description: "ফ্রিল্যান্সিং ট্রেনিং ইন্ডাস্ট্রিতে সর্বোচ্চ মান প্রতিষ্ঠা",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const missionItems = [
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "১০ লক্ষ মানুষের কাছে",
      description: "আমার ব্র্যান্ড পৌঁছে দেওয়া",
      number: "10L+",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "শূন্য থেকে দক্ষ",
      description: "Agency Owner হিসেবে গড়ে তোলা",
      number: "∞",
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: "১০০ সফল ফ্রিল্যান্সার",
      description: "২০২৫ সালের মধ্যে তৈরি করা",
      number: "100",
    },
    {
      icon: <Building2 className="w-7 h-7" />,
      title: "১০ জন Agency Owner",
      description: "২০২৫ সালের মধ্যে তৈরি করা",
      number: "10",
    },
  ];

  return (
    <section className="bg-black text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-6xl font-bold mb-4">
            <span className="text-red-700">My Mission</span>{" "}
            <span className="text-white">and Vision</span>
          </h2>
          <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto">
            আমাদের লক্ষ্য এবং উদ্দেশ্য - চলুন একসাথে জিতি
          </p>
        </div>

        {/* Vision Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Target className="w-10 h-10" />
            <h3 className="text-3xl md:text-4xl font-bold">
              Vision - দৃষ্টিভঙ্গি
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {visionItems.map((item, index) => (
              <div
                key={index}
                className="group relative bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-md p-6 hover:border-transparent transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                {/* Icon */}
                <div
                  className={`relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br ${item.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {item.icon}
                </div>

                {/* Content */}
                <h4 className="relative text-xl font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="relative text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Decorative Element */}
                <div
                  className={`absolute bottom-0 right-0 w-20 h-20 bg-linear-to-tl ${item.color} opacity-5 rounded-tl-full`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-16">
          <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent w-full max-w-2xl"></div>
        </div>

        {/* Mission Section */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-12">
            <Rocket className="w-10 h-10 text-yellow-700" />
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-700">
              Mission - লক্ষ্য
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {missionItems.map((item, index) => (
              <div
                key={index}
                className="group relative bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-md p-6 hover:border-yellow-600 hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300"
              >
                {/* Number Badge */}
                <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-600 px-3 py-1 rounded-full text-sm font-bold">
                  {item.number}
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-yellow-500/20 text-yellow-700 mb-4 group-hover:bg-yellow-600 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>

                {/* Content */}
                <h4 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-yellow-600 to-yellow-500 w-0 group-hover:w-full transition-all duration-1000"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

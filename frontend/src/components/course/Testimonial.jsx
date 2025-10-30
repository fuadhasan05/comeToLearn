export default function TestimonialSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Testimonial Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 sm:p-12 shadow-lg transition-all duration-300 hover:bg-gray-100">
          <p className="text-2xl sm:text-3xl font-semibold text-gray-800 leading-relaxed">
            আমি চাই, আপনি সঠিক পথে এগিয়ে{" "}
            <span className="text-red-600 font-bold">
              একজন সফল ফ্রিল্যান্সার
            </span>{" "}
            হয়ে উঠুন। বিগত পাঁচ বছরের ফ্রিল্যান্সিং অভিজ্ঞতা থেকে অর্জিত জ্ঞান
            ও বাস্তব অভিজ্ঞতার আলোকে আমি এই কোর্সটি সাজিয়েছি।
          </p>
        </div>
      </div>
    </section>
  );
}

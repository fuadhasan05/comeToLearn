"use client";

export default function Loading() {
  return (
    <section className="min-h-screen bg-black flex flex-col justify-center items-center px-4 py-10">
      <h1 className="text-4xl font-bold text-white text-center mb-8 animate-pulse">
        Loading Courses...
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden animate-pulse"
          >
            {/* Image skeleton */}
            <div className="w-full h-48 bg-gray-800" />

            {/* Text skeletons */}
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>

              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



// Loading-2 //

// "use client";
// import { Loader2 } from "lucide-react";

// export default function Loading({ message = "Loading..." }) {
//   return (
//     <section className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
//       {/* Spinner */}
//       <Loader2 className="w-12 h-12 animate-spin text-red-600 mb-4" />
      
//       {/* Message */}
//       <p className="text-lg text-gray-300 font-medium">{message}</p>
//     </section>
//   );
// }


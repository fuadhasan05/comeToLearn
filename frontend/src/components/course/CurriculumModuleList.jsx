import React, { useEffect, useRef } from "react";
import { PlayCircle, ChevronUp, ChevronDown } from "lucide-react";

export default function CurriculumModuleList({
  curriculum,
  openModules,
  toggleModule,
  handleEdit,
}) {
  const contentRefs = useRef([]);

  // Animation logic moved here
  useEffect(() => {
    curriculum.forEach((_, idx) => {
      const el = contentRefs.current[idx];
      if (!el) return;

      if (openModules.includes(idx)) {
        // Expand
        const height = el.scrollHeight;
        el.style.maxHeight = `${height}px`;
        el.style.transition = "max-height 350ms ease";
        // make inner content visible
        if (el.firstElementChild) el.firstElementChild.style.opacity = "1";
      } else {
        // Collapse
        el.style.maxHeight = "0px";
        if (el.firstElementChild) el.firstElementChild.style.opacity = "0";
      }
    });
  }, [openModules, curriculum]);

  return (
    <div className="space-y-4">
      {/* Modules List */}
      {curriculum.map((module, moduleIndex) => (
        <div
          key={moduleIndex}
          className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow transition-all duration-300 "
        >
          {/* Module Header Button */}
          <button
            onClick={() => toggleModule(moduleIndex)}
            className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500/20 text-yellow-600 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
                {moduleIndex + 1}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-700">
                {module.title}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm hidden sm:block">
                {module.lessons ? module.lessons.length : 0} Lessons
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(module);
                }}
                className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded"
              >
                Edit
              </button>
              {openModules.includes(moduleIndex) ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </button>

          {/* Lessons List with smooth expand/collapse */}
          <div
            ref={(el) => (contentRefs.current[moduleIndex] = el)}
            className="border-t border-gray-200 overflow-hidden"
            style={{
              maxHeight: "0px",
              transition: "max-height 350ms ease",
            }}
          >
            <div
              className={`transition-opacity duration-300 ${
                openModules.includes(moduleIndex) ? "opacity-100" : "opacity-0"
              }`}
            >
              {(module.lessons || []).map((lesson, lessonIndex) => (
                <div
                  key={lessonIndex}
                  className="flex items-center justify-between p-4 sm:p-5 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <PlayCircle className="w-5 h-5 text-green-500" />
                    <span
                      className={`text-sm sm:text-base text-gray-900 truncate`}
                    >
                      {lesson.title}
                    </span>
                  </div>
                  {lesson.duration && (
                    <span className="text-gray-500 text-sm font-mono">
                      {lesson.duration}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

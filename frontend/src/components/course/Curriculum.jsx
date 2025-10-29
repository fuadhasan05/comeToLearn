"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  PlayCircle,
  Clock,
  ChevronUp,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";
import Button from "../ui/Button";

export default function CurriculumSection({ course_id }) {
  const [curriculum, setCurriculum] = useState([]);
  const [openModules, setOpenModules] = useState([]);
  const contentRefs = useRef([]);
  // fetchCurriculum is used in effect and after save/delete
  const fetchCurriculum = useCallback(async () => {
    try {
      if (!course_id) {
        console.warn(
          "CurriculumSection: no course_id provided — skipping fetch"
        );
        setCurriculum([]);
        return;
      }

      // Modules endpoint expects optional query ?course_id=...
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/modules?course_id=${course_id}`
      );
      if (!res.ok) {
        console.error("Failed to fetch modules:", res.status, res.statusText);
        setCurriculum([]);
        return;
      }

      let data = await res.json();
      data = data || [];

      // Unlock all lessons by default (user requested "unlock all module")
      const unlocked = data.map((mod) => ({
        ...mod,
        lessons: (mod.lessons || []).map((lesson) => ({
          ...lesson,
          isLocked: false,
        })),
      }));

      setCurriculum(unlocked);
    } catch (err) {
      console.error("Error fetching curriculum:", err);
    }
  }, [course_id]);

  useEffect(() => {
    fetchCurriculum();
  }, [fetchCurriculum]);

  // Form state for add/edit module
  const [showForm, setShowForm] = useState(false);
  const [formModule, setFormModule] = useState(null);

  const handleNew = () => {
    setFormModule({ course_id: course_id || "", title: "", lessons: [] });
    setShowForm(true);
  };

  const handleEdit = (mod) => {
    // create a deep copy to edit safely
    setFormModule(JSON.parse(JSON.stringify(mod)));
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormModule(null);
  };

  const updateFormField = (field, value) => {
    setFormModule((prev) => ({ ...prev, [field]: value }));
  };

  const updateLessonField = (index, field, value) => {
    setFormModule((prev) => {
      const lessons = [...(prev.lessons || [])];
      lessons[index] = { ...lessons[index], [field]: value };
      return { ...prev, lessons };
    });
  };

  const addLessonToForm = () => {
    setFormModule((prev) => ({
      ...prev,
      lessons: [
        ...(prev.lessons || []),
        { title: "", duration: "", isLocked: false },
      ],
    }));
  };

  const removeLessonFromForm = (index) => {
    setFormModule((prev) => ({
      ...prev,
      lessons: prev.lessons.filter((_, i) => i !== index),
    }));
  };

  const saveModule = async () => {
    if (!formModule) return;
    try {
      if (formModule._id) {
        // update
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/modules/${formModule._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formModule),
          }
        );
        if (!res.ok) throw new Error("Failed to update module");
      } else {
        // create
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/modules`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formModule),
          }
        );
        if (!res.ok) throw new Error("Failed to create module");
      }

      setShowForm(false);
      setFormModule(null);
      await fetchCurriculum();
    } catch (err) {
      console.error("Error saving module:", err);
      alert("Error saving module. See console.");
    }
  };

  const toggleModule = (index) => {
    setOpenModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    // ensure refs exist
    curriculum.forEach((_, idx) => {
      const el = contentRefs.current[idx];
      if (!el) return;
      if (openModules.includes(idx)) {
        // set to measured height to animate open
        const height = el.scrollHeight;
        el.style.maxHeight = `${height}px`;
        el.style.transition = "max-height 350ms ease";
        // also make inner content visible
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        el.firstElementChild && (el.firstElementChild.style.opacity = "1");
      } else {
        // collapse
        el.style.maxHeight = "0px";
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        el.firstElementChild && (el.firstElementChild.style.opacity = "0");
      }
    });
  }, [openModules, curriculum]);

  const getTotalLessons = () =>
    curriculum.reduce(
      (acc, mod) => acc + (mod.lessons ? mod.lessons.length : 0),
      0
    );

  const getTotalDuration = () => {
    // Sum lesson.duration across modules. Support formats like:
    // - "MM:SS" or "HH:MM:SS"
    // - "1h30m", "2h", "45m"
    // - "90m" or plain minutes
    const parseToSeconds = (str) => {
      if (!str || typeof str !== "string") return 0;
      str = str.trim();

      // HH:MM:SS or MM:SS
      const parts = str.split(":").map((p) => p.trim());
      if (parts.length >= 2 && parts.every((p) => /^\d+$/.test(p))) {
        // if 3 parts: h:m:s, if 2 parts: m:s
        if (parts.length === 3) {
          const [h, m, s] = parts.map(Number);
          return h * 3600 + m * 60 + s;
        }
        const [m, s] = parts.map(Number);
        return m * 60 + s;
      }

      // Patterns like "1h30m", "2h", "45m", "90m"
      let total = 0;
      const hourMatch = str.match(/(\d+)\s*h(?:ours?)?/i);
      const minuteMatch = str.match(/(\d+)\s*m(?:in(?:ute)?s?)?/i);
      const secondMatch = str.match(/(\d+)\s*s(?:ec(?:ond)?s?)?/i);
      if (hourMatch) total += parseInt(hourMatch[1], 10) * 3600;
      if (minuteMatch) total += parseInt(minuteMatch[1], 10) * 60;
      if (secondMatch) total += parseInt(secondMatch[1], 10);

      if (total > 0) return total;

      // If it's just a number, treat as minutes
      const onlyNumber = str.match(/^\d+$/);
      if (onlyNumber) return parseInt(onlyNumber[0], 10) * 60;

      // If ends with 'm' and number before
      const simpleMin = str.match(/^(\d+)\s*m$/i);
      if (simpleMin) return parseInt(simpleMin[1], 10) * 60;

      return 0;
    };

    const totalSeconds = curriculum.reduce((acc, mod) => {
      const lessons = mod.lessons || [];
      const secs = lessons.reduce(
        (sAcc, lesson) => sAcc + parseToSeconds(lesson.duration),
        0
      );
      return acc + secs;
    }, 0);

    if (totalSeconds === 0) return "—";

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    // const seconds = totalSeconds % 60; // not shown for brevity

    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <section className="bg-white text-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            কোর্স কারিকুলাম
          </h2>
          <p className="text-lg text-gray-500 mb-6">
            সম্পূর্ণ কোর্সের বিষয়বস্তু দেখুন
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <PlayCircle className="w-5 h-5 text-yellow-500" />
              <span>{getTotalLessons()} Lessons</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span>{getTotalDuration()} Total Duration</span>
            </div>
          </div>
        </div>

        {/* Curriculum List */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleNew}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer"
          >
            + Add Module
          </button>
        </div>

        {/* Form for Adding/Editing Module */}
        {showForm && formModule && (
          <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                {formModule._id ? "Edit Module" : "Add Module"}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={saveModule}
                  className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <input
                name="title"
                value={formModule.title}
                onChange={(e) => updateFormField("title", e.target.value)}
                placeholder="Module title"
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-yellow-500"
              />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Lessons</h4>
                  <button
                    onClick={addLessonToForm}
                    className="text-sm text-green-600 cursor-pointer"
                  >
                    + Add Lesson
                  </button>
                </div>
                <div className="space-y-3">
                  {(formModule.lessons || []).map((ls, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        value={ls.title}
                        onChange={(e) =>
                          updateLessonField(idx, "title", e.target.value)
                        }
                        placeholder="Lesson title"
                        className="flex-1 border border-gray-300 rounded-xl p-2"
                      />
                      <input
                        value={ls.duration}
                        onChange={(e) =>
                          updateLessonField(idx, "duration", e.target.value)
                        }
                        placeholder="e.g. 05:30 or 5m"
                        className="w-28 border border-gray-300 rounded-xl p-2 font-mono"
                      />
                      <button
                        onClick={() => removeLessonFromForm(idx)}
                        className="text-red-600 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modules List */}
        <div className="space-y-4">
          {curriculum.map((module, moduleIndex) => (
            <div
              key={moduleIndex}
              className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow transition-all duration-300 "
            >
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
                    {module.lessons.length} Lessons
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
                    openModules.includes(moduleIndex)
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="flex items-center justify-between p-4 sm:p-5 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* show unlocked icon since lessons are forced unlocked */}
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

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-linear-to-r from-yellow-100 via-pink-100 to-yellow-100 border-2 border-gray-200 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4">
            সম্পূর্ণ কোর্স এক্সেস পেতে আজই এনরোল করুন
          </h3>
          <p className="text-gray-600 mb-6">
            লাইফটাইম এক্সেস • কমিউনিটি সাপোর্ট
          </p>
          <Button
            href="/all-courses"
            variant="primary"
            size="md"
            className="inline-flex items-center"
            icon={ShoppingCart}
          >
            এনরোল করুন - মাত্র ১০ টাকা
          </Button>
        </div>
      </div>
    </section>
  );
}

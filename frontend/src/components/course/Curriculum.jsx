"use client";
import { useEffect, useState, useCallback } from "react";
import { PlayCircle, Clock, ShoppingCart } from "lucide-react";
import Button from "../ui/Button";
import CurriculumModuleForm from "./CurriculumModuleForm";
import CurriculumModuleList from "./CurriculumModuleList";

// --- Utility Functions ---

const parseToSeconds = (str) => {
  if (!str || typeof str !== "string") return 0;
  str = str.trim();

  // HH:MM:SS or MM:SS
  const parts = str.split(":").map((p) => p.trim());
  if (parts.length >= 2 && parts.every((p) => /^\d+$/.test(p))) {
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

// --- Main Component ---

export default function CurriculumSection({ course_id }) {
  const [curriculum, setCurriculum] = useState([]);
  const [openModules, setOpenModules] = useState([]);

  // --- Data Fetching and Calculations ---

  const fetchCurriculum = useCallback(async () => {
    try {
      if (!course_id) {
        console.warn(
          "CurriculumSection: no course_id provided — skipping fetch"
        );
        setCurriculum([]);
        return;
      }

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

      // Unlock all lessons by default
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

  const toggleModule = (index) => {
    setOpenModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getTotalLessons = () =>
    curriculum.reduce(
      (acc, mod) => acc + (mod.lessons ? mod.lessons.length : 0),
      0
    );

  const getTotalDuration = () => {
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

    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // --- Form State and Handlers (CRUD Logic) ---

  const [showForm, setShowForm] = useState(false);
  const [formModule, setFormModule] = useState(null);

  const handleNew = () => {
    const nextIndex = curriculum.length + 1;
    setFormModule({
      course_id: course_id || "",
      title: "",
      module_index: nextIndex,
      lessons: [],
    });
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
      // Validate required fields
      if (!formModule.course_id || !formModule.title) {
        alert("Course ID and title are required");
        return;
      }

      // Update lesson_index based on current order
      const moduleToSave = {
        ...formModule,
        lessons: formModule.lessons.map((lesson, index) => ({
          ...lesson,
          lesson_index: index + 1,
        })),
      };

      const method = formModule._id ? "PUT" : "POST";
      const url = formModule._id
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/modules/${formModule._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/modules`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(moduleToSave),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            `Failed to ${formModule._id ? "update" : "create"} module`
        );
      }

      setShowForm(false);
      setFormModule(null);
      await fetchCurriculum(); // Re-fetch data to update the list
    } catch (err) {
      console.error("Error saving module:", err);
      alert(`Failed to save module: ${err.message}`);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    if (!moduleId) return;
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/modules/${moduleId}`;
      const res = await fetch(url, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete module');
      // Close form and refresh list
      setShowForm(false);
      setFormModule(null);
      await fetchCurriculum();
    } catch (err) {
      console.error('Error deleting module:', err);
      alert(`Failed to delete module: ${err.message}`);
    }
  };

  // --- Render ---

  return (
    <section className="bg-white text-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header and Stats */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            কোর্স কারিকুলাম
          </h2>
          <p className="text-lg text-gray-500 mb-6">
            সম্পূর্ণ কোর্সের বিষয়বস্তু দেখুন
          </p>

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

        {/* Admin/CRUD Interface: Add Button and Form */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleNew}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer"
          >
            + Add Module
          </button>
        </div>

        {showForm && formModule && (
          <CurriculumModuleForm
            formModule={formModule}
            handleCancel={handleCancel}
            saveModule={saveModule}
            updateFormField={updateFormField}
            updateLessonField={updateLessonField}
            addLessonToForm={addLessonToForm}
            removeLessonFromForm={removeLessonFromForm}
            handleDelete={handleDeleteModule}
          />
        )}

        {/* Curriculum Display */}
        <CurriculumModuleList
          curriculum={curriculum}
          openModules={openModules}
          toggleModule={toggleModule}
          handleEdit={handleEdit}
        />

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
            কোর্সটি কিনুন
          </Button>
        </div>
      </div>
    </section>
  );
}

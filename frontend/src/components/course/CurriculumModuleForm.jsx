export default function CurriculumModuleForm({
  formModule,
  handleCancel,
  saveModule,
  updateFormField,
  updateLessonField,
  addLessonToForm,
  removeLessonFromForm,
}) {
  return (
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
        {/* Module Title Input */}
        <input
          name="title"
          value={formModule.title}
          onChange={(e) => updateFormField("title", e.target.value)}
          placeholder="Module title"
          className="w-full border border-gray-300 rounded-xl p-3"
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
            {/* Lesson Inputs */}
            {(formModule.lessons || []).map((ls, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <div className="shrink-0 w-8 text-center font-medium text-gray-500">
                  {idx + 1}
                </div>
                <div className="shrink-0 flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (idx > 0) {
                        const newLessons = [...formModule.lessons];
                        [newLessons[idx - 1], newLessons[idx]] = [
                          newLessons[idx],
                          newLessons[idx - 1],
                        ];
                        updateFormField("lessons", newLessons);
                      }
                    }}
                    disabled={idx === 0}
                    className={`text-gray-500 hover:text-gray-700 ${idx === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (idx < formModule.lessons.length - 1) {
                        const newLessons = [...formModule.lessons];
                        [newLessons[idx], newLessons[idx + 1]] = [
                          newLessons[idx + 1],
                          newLessons[idx],
                        ];
                        updateFormField("lessons", newLessons);
                      }
                    }}
                    disabled={idx === formModule.lessons.length - 1}
                    className={`text-gray-500 hover:text-gray-700 ${idx === formModule.lessons.length - 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    ↓
                  </button>
                </div>
                <input
                  value={ls.title || ""}
                  onChange={(e) =>
                    updateLessonField(idx, "title", e.target.value)
                  }
                  placeholder="Lesson title"
                  className="flex-1 border border-gray-300 rounded-xl p-2"
                />
                <input
                  value={ls.duration || ""}
                  onChange={(e) =>
                    updateLessonField(idx, "duration", e.target.value)
                  }
                  placeholder="e.g. 05:30 or 5m"
                  className="w-28 border border-gray-300 rounded-xl p-2 font-mono"
                />
                <button
                  type="button"
                  onClick={() => removeLessonFromForm(idx)}
                  className="text-red-600 hover:text-red-700 cursor-pointer px-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

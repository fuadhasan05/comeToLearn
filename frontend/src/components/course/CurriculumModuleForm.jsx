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
              <div key={idx} className="flex gap-2">
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
  );
}

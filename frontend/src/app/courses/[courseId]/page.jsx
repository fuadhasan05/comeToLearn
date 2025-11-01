'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import {
  PlayCircle,
  CheckCircle,
  BookOpen,
  ArrowLeft,
  Clock,
  ChevronRight,
  ChevronLeft,
  List
} from 'lucide-react';
import Loading from '@/components/ui/Loading';

export default function CourseViewerPage() {
  const router = useRouter();
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  const courseId = params?.courseId;

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const apiRoot = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      console.log('Fetching course:', courseId, 'from:', apiRoot);

      // Try route endpoint first
      let res = await fetch(`${apiRoot}/api/courses/route/${courseId}`);
      console.log('Route response status:', res.status);

      // If not found by route, try direct ID endpoint
      if (res.status === 404) {
        console.log('Course not found by route, trying ID endpoint');
        res = await fetch(`${apiRoot}/api/courses/${courseId}`);
        console.log('ID response status:', res.status);
      }

      if (!res.ok) {
        const errText = await res.text();
        console.error('Error response:', errText);
        throw new Error(res.status === 404 ? 'Course not found' : `Error: ${errText}`);
      }

      const data = await res.json();
      console.log('Course data:', data);
      
      if (!data) {
        throw new Error('No course data received');
      }

      setCourse(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching course:', err);
      setError(err.message || 'কোর্স লোড করতে সমস্যা হয়েছে');
      setLoading(false);
    }
  };

  const selectLesson = (index) => {
    setCurrentLessonIndex(index);
    setPlaying(true);
    setShowSidebar(false);
  };

  const nextLesson = () => {
    if (course && currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setPlaying(true);
    }
  };

  const previousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setPlaying(true);
    }
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{error || 'কোর্স পাওয়া যায়নি'}</h1>
          <Link
            href="/all-courses"
            className="text-red-500 hover:text-red-400"
          >
            সকল কোর্স দেখুন
          </Link>
        </div>
      </div>
    );
  }

  const currentLesson = course.lessons[currentLessonIndex];
  const totalLessons = course.lessons.length;
  const progress = Math.round(((currentLessonIndex + 1) / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Bar */}
      <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-full px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/all-courses"
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="font-bold text-lg truncate max-w-xs sm:max-w-md">
                  {course.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Lesson {currentLessonIndex + 1}/{totalLessons}</span>
                  <span>•</span>
                  <span>{progress}% Complete</span>
                </div>
              </div>
            </div>

            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden bg-gray-800 hover:bg-gray-700 p-2 rounded-lg"
            >
              <List className="w-6 h-6" />
            </button>

            {/* Progress Bar (Desktop) */}
            <div className="hidden sm:block">
              <div className="w-32 bg-gray-800 rounded-full h-2">
                <div
                  className="bg-linear-to-r from-red-600 to-yellow-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Lessons List */}
        <div className={`${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 w-80 lg:w-96 bg-gray-900 border-r border-gray-800 h-[calc(100vh-73px)] overflow-y-auto transition-transform duration-300 z-40`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-yellow-500" />
                Course Content
              </h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {course.lessons.map((lesson, index) => {
                const isCurrent = currentLessonIndex === index;

                return (
                  <button
                    key={lesson.lesson_id}
                    onClick={() => selectLesson(index)}
                    className={`w-full p-4 flex items-start gap-3 rounded-lg hover:bg-gray-800 transition-colors text-left ${
                      isCurrent ? 'bg-red-900/20 border-2 border-red-600' : 'border-2 border-transparent'
                    }`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {isCurrent ? (
                        <PlayCircle className="w-5 h-5 text-red-500 fill-red-500" />
                      ) : (
                        <PlayCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${
                        isCurrent ? 'text-white' : 'text-gray-300'
                      }`}>
                        {index + 1}. {lesson.title}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration_minutes} মিনিট
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {showSidebar && (
          <div
            className="lg:hidden fixed inset-0 bg-black/70 z-30"
            onClick={() => setShowSidebar(false)}
          ></div>
        )}

        {/* Main Content - Video Player */}
        <div className="flex-1">
          <div className="h-[calc(100vh-73px)] overflow-y-auto">
            {/* Video Player */}
            <div className="bg-black aspect-video">
              <ReactPlayer
                url={currentLesson.video_url}
                playing={playing}
                controls
                width="100%"
                height="100%"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={nextLesson}
                config={{
                  youtube: {
                    playerVars: { showinfo: 1 }
                  }
                }}
              />
            </div>

            {/* Lesson Info */}
            <div className="p-6 bg-gray-900">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                      {currentLesson.title}
                    </h2>
                    <p className="text-gray-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {currentLesson.duration_minutes} মিনিট
                    </p>
                  </div>
                  <span className="bg-gray-800 px-4 py-2 rounded-lg text-sm font-semibold">
                    Lesson {currentLessonIndex + 1} of {totalLessons}
                  </span>
                </div>

                {/* Lesson Description */}
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold mb-3">Lesson Overview</h3>
                  <p className="text-gray-400 leading-relaxed">
                    এই লেসনে আপনি {currentLesson.title} সম্পর্কে বিস্তারিত শিখবেন।
                    আমাদের ইন্সট্রাক্টর ধাপে ধাপে সব কিছু ব্যাখ্যা করবেন।
                  </p>
                </div>

                {/* Course Info */}
                <div className="bg-black border border-gray-800 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold mb-3">Course Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Total Lessons</p>
                      <p className="font-semibold">{totalLessons} Lessons</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Total Duration</p>
                      <p className="font-semibold">
                        {course.lessons.reduce((acc, l) => acc + l.duration_minutes, 0)} Minutes
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Category</p>
                      <p className="font-semibold">{course.category}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Price</p>
                      <p className="font-semibold">
                        {course.price.is_discounted ? (
                          <>
                            <span className="line-through text-gray-500 mr-2">
                              ৳{course.price.original}
                            </span>
                            <span className="text-green-500">
                              ৳{course.price.discounted}
                            </span>
                          </>
                        ) : (
                          <span>৳{course.price.original}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
                  <button
                    onClick={previousLesson}
                    disabled={currentLessonIndex === 0}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous Lesson
                  </button>
                  
                  <button
                    onClick={nextLesson}
                    disabled={currentLessonIndex === totalLessons - 1}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next Lesson
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
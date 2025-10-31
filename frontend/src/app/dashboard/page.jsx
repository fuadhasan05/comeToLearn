'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Loading from '@/components/ui/Loading';

// Helper function to format last accessed date in Bangla
const formatLastAccessed = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const accessDate = new Date(date);
  const diffMinutes = Math.floor((now - accessDate) / (1000 * 60));
  
  if (diffMinutes < 60) {
    return `${diffMinutes} মিনিট আগে`;
  }
  
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} ঘন্টা আগে`;
  }
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays} দিন আগে`;
  }
  
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths} মাস আগে`;
};
import { 
  BookOpen, 
  Clock, 
  PlayCircle,
  Settings,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedLessons: 0,
    totalHours: 0,
    certificates: 0
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      // Fetch enrolled courses
      fetchEnrolledCourses();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchEnrolledCourses = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/enrollments?user_id=${user.uid}`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch enrolled courses');
      }

      const data = await res.json();
      
      if (data.success) {
        setEnrolledCourses(data.data.courses.map(course => ({
          id: course.course_id,
          title: course.title,
          thumbnail: course.image?.url || '/placeholder-course.jpg',
          progress: course.progress.percentage,
          totalLessons: course.progress.total,
          completedLessons: course.progress.completed,
          lastAccessed: formatLastAccessed(course.last_accessed)
        })));

        setStats(data.data.stats);
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      // Show error state or fallback UI
      setEnrolledCourses([]);
      setStats({
        totalCourses: 0,
        completedLessons: 0,
        totalHours: 0,
        certificates: 0
      });
    }
  };

  const [error, setError] = useState(null);

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (!user) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button 
            onClick={() => {
              setError(null);
              fetchEnrolledCourses();
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-linear-to-r from-red-900/30 to-yellow-900/30 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-red-600 to-yellow-600 flex items-center justify-center text-2xl font-bold">
                {user.displayName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Assalamualikum, {user.displayName}!
                </h1>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/dashboard/settings"
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-red-600 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 text-red-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.totalCourses}</div>
            <div className="text-gray-400 text-sm">এনরোল কোর্স</div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-yellow-600 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.completedLessons}</div>
            <div className="text-gray-400 text-sm">সম্পন্ন লেসন</div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-600 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.totalHours}</div>
            <div className="text-gray-400 text-sm">মোট ঘন্টা</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">আমার কোর্সসমূহ</h2>
              <Link
                href="/all-courses"
                className="text-red-500 hover:text-red-400 font-semibold"
              >
                সকল কোর্স দেখুন
              </Link>
            </div>

            <div className="space-y-4">
              {enrolledCourses.length === 0 ? (
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
                  <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">কোনো কোর্স নেই</h3>
                  <p className="text-gray-400 mb-6">
                    আপনি এখনো কোনো কোর্সে এনরোল করেননি
                  </p>
                  <Link
                    href="/all-courses"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    কোর্স ব্রাউজ করুন
                  </Link>
                </div>
              ) : (
                enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      {/* Thumbnail */}
                      <div className="sm:w-48 h-32 rounded-lg overflow-hidden shrink-0 relative">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 192px"
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        
                        {/* Progress */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">
                              {course.completedLessons}/{course.totalLessons} লেসন সম্পন্ন
                            </span>
                            <span className="text-sm font-semibold text-yellow-500">
                              {course.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div
                              className="bg-linear-to-r from-red-600 to-yellow-600 h-2 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            শেষ দেখা: {course.lastAccessed}
                          </span>
                          <Link
                            href={`/courses/${course.id}`}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
                          >
                            <PlayCircle className="w-4 h-4" />
                            চালিয়ে যান
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href="/all-courses"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-red-500" />
                  <span>All Courses</span>
                </Link>
                <Link
                  href="/live-course"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <PlayCircle className="w-5 h-5 text-yellow-500" />
                  <span>Live Courses</span>
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Settings className="w-5 h-5 text-blue-500" />
                  <span>Settings</span>
                </Link>
              </div>
            </div>

            {/* Learning Streak */}
            
          </div>
        </div>
      </div>
    </div>
  );
}
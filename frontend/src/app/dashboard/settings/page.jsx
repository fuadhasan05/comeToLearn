'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { User, Mail, Camera, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    displayName: '',
    email: ''
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        displayName: user.displayName || '',
        email: user.email || ''
      });
    }
  }, [user, loading, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setMessage({ type: '', text: '' });

    // TODO: Update user profile
    setTimeout(() => {
      setSaveLoading(false);
      setMessage({ type: 'success', text: 'প্রোফাইল সফলভাবে আপডেট হয়েছে' });
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            ড্যাশবোর্ডে ফিরে যান
          </Link>
          <h1 className="text-3xl font-bold">অ্যাকাউন্ট সেটিংস</h1>
          <p className="text-gray-400 mt-2">আপনার প্রোফাইল তথ্য আপডেট করুন</p>
        </div>

        {/* Profile Picture */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-6">
          <h2 className="text-xl font-bold mb-6">প্রোফাইল ছবি</h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-red-600 to-yellow-600 flex items-center justify-center text-4xl font-bold">
              {user.displayName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors mb-2">
                <Camera className="w-5 h-5" />
                ছবি আপলোড করুন
              </button>
              <p className="text-sm text-gray-400">JPG, PNG - সর্বোচ্চ 2MB</p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
          <h2 className="text-xl font-bold mb-6">ব্যক্তিগত তথ্য</h2>

          {message.text && (
            <div
              className={`mb-6 px-4 py-3 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-500/10 border border-green-500 text-green-500'
                  : 'bg-red-500/10 border border-red-500 text-red-500'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">
                পূর্ণ নাম
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">
                ইমেইল
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                ইমেইল পরিবর্তন করা যাবে না
              </p>
            </div>

            <button
              type="submit"
              disabled={saveLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saveLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>সেভ হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>পরিবর্তন সংরক্ষণ করুন</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
import Banner from '@/components/home/Banner';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import CTASection from '@/components/home/CTASection';
import LiveClass from '@/components/home/LiveClass';
import StudentReview from '@/components/home/StudentReview';
import MissionVision from '@/components/home/MissionVision';
import Quote from '@/components/home/Quote';
import Support from '@/components/home/Support';
import FAQ from '@/components/home/FAQ';

export default function Home() {
  return (
    <main>
      <Banner />
      <FeaturedCourses/>
      <CTASection/>
      <LiveClass/>
      <StudentReview/>
      <MissionVision/>
      <Quote/>
      <Support/>
      <FAQ/>
    </main>
  );
}
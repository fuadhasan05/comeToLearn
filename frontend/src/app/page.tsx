import Banner from '@/components/home/Banner';
import CTASection from '@/components/home/CTASection';
import LiveClass from '@/components/home/LiveClass';
import MissionVision from '@/components/home/MissionVision';
import Support from '@/components/home/Support';
import Quote from '@/components/home/Quote';

export default function Home() {
  return (
    <main>
      <Banner />
      
      <CTASection/>
      <LiveClass/>
      <MissionVision/>
      <Quote/>
      <Support/>
    </main>
  );
}
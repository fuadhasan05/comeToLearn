import Banner from '@/components/home/Banner';
import CTASection from '@/components/home/CTASection';
import LiveClass from '@/components/home/LiveClass';
import MissionVision from '@/components/home/MissionVision';

export default function Home() {
  return (
    <main>
      <Banner />
      
      <CTASection/>
      <LiveClass/>
      <MissionVision/>
    </main>
  );
}
import Banner from '@/components/home/Banner';
import CTASection from '@/components/home/CTASection';
import LiveClass from '@/components/home/LiveClass';

export default function Home() {
  return (
    <main>
      <Banner />
      
      <CTASection/>
      <LiveClass/>
    </main>
  );
}
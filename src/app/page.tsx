import LandingHeader from '@/components/landing/LandingHeader'
import LandingHero from '@/components/landing/LandingHero'
import LandingFeatures from '@/components/landing/LandingFeatures'

export default function LandingPage() {
  return (
    <div className="landing-page">
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
    </div>
  )
}

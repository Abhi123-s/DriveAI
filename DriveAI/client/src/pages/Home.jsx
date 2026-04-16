/**
 * Home.jsx — Main page that assembles all sections
 *
 * Renders all sections in order:
 * 1. Hero
 * 2. Car Models
 * 3. Features
 * 4. Comparison Table
 * 5. Pricing
 * 6. Booking Form
 * 7. Contact
 */

import HeroSection from "../components/HeroSection";
import CarModels from "../components/CarModels";
import FeaturesSection from "../components/FeaturesSection";
import ComparisonTable from "../components/ComparisonTable";
import PricingSection from "../components/PricingSection";
import BookingForm from "../components/BookingForm";
import ContactSection from "../components/ContactSection";

const Home = () => {
  return (
    <main>
      {/* 1. Hero — full-screen landing section */}
      <HeroSection />

      {/* 2. Car Models — filterable grid */}
      <CarModels />

      {/* 3. Features — brand highlights */}
      <FeaturesSection />

      {/* 4. Side-by-side comparison */}
      <ComparisonTable />

      {/* 5. Pricing cards */}
      <PricingSection />

      {/* 6. Test drive booking form */}
      <BookingForm />

      {/* 7. Contact + footer */}
      <ContactSection />
    </main>
  );
};

export default Home;

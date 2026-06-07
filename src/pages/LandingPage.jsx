
import HeroSection from "../component/HeroSection";
import FeaturesSection from "../component/FeaturesSection";
import { supabase } from "../lib/supabase";

export default function LandingPage() {

  console.log(supabase);
  
  return (
    <>
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)] flex justify-center items-center">


      <HeroSection />

      
    </main>
    
    
<div>
     <FeaturesSection />
    </div> 
   
    </>
    
  );
}
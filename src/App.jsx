import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

import PricingSection from './pages/PricingSection'
import Navbar from './component/Navbar'
import ContactPage from './pages/ContactPage'
import AdminPage from "./pages/AdminPage";
import PopupMessage from './component/pop'
import ScrollToTop from './hooks/ScrollToTop'
import CancelBookingPage from "./pages/CancelBookingPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
          <Navbar />
    <Routes>
      
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<LoginPage />} />


      <Route path="/kontakt" element={<ContactPage />} />
      <Route path="/cennik" element={<PricingSection />} />
      <Route path="/zrusit-rezervaciu/:token" element={<CancelBookingPage />} />

    </Routes>
    <PopupMessage></PopupMessage>
        </>
  );
}
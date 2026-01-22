import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/app/components/LandingPage';
import { LoginPage } from '@/app/components/LoginPage';
import { RegisterPage } from '@/app/components/RegisterPage';
import { ApplicationFormPage } from '@/app/components/ApplicationFormPage';
import { CandidateDashboard } from '@/app/components/CandidateDashboard';
import { AdminDashboard } from '@/app/components/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/application-form" element={<ApplicationFormPage />} />
        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

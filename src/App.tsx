import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { SyncProvider } from './context/SyncContext';
import { PatientProvider } from './context/PatientContext';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ResourcesPage } from './pages/public/ResourcesPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/auth/LoginPage';

// Worker Pages
import { WorkerDashboard } from './pages/worker/WorkerDashboard';
import { PatientsListPage } from './pages/worker/PatientsListPage';
import { PatientProfilePage } from './pages/worker/PatientProfilePage';
import { NewPatientPage } from './pages/worker/NewPatientPage';
import { AssessmentWizardPage } from './pages/worker/AssessmentWizardPage';
import { HistoryPage } from './pages/worker/HistoryPage';
import { FollowupsPage } from './pages/worker/FollowupsPage';
import { ReferralsPage } from './pages/worker/ReferralsPage';
import { TeleconsultPage } from './pages/worker/TeleconsultPage';
import { FacilitiesPage } from './pages/worker/FacilitiesPage';
import { SyncCenterPage } from './pages/worker/SyncCenterPage';

// Doctor Pages
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { DoctorPatientView } from './pages/doctor/DoctorPatientView';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';

export function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <AuthProvider>
          <SyncProvider>
            <PatientProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public Institutional Portal */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />

                  {/* Health Worker Portal */}
                  <Route path="/worker/dashboard" element={<WorkerDashboard />} />
                  <Route path="/worker/patients" element={<PatientsListPage />} />
                  <Route path="/worker/patient/:id" element={<PatientProfilePage />} />
                  <Route path="/worker/new-patient" element={<NewPatientPage />} />
                  <Route path="/worker/assessment" element={<AssessmentWizardPage />} />
                  <Route path="/worker/history" element={<HistoryPage />} />
                  <Route path="/worker/followups" element={<FollowupsPage />} />
                  <Route path="/worker/referrals" element={<ReferralsPage />} />
                  <Route path="/worker/teleconsult" element={<TeleconsultPage />} />
                  <Route path="/worker/facilities" element={<FacilitiesPage />} />
                  <Route path="/worker/sync" element={<SyncCenterPage />} />

                  {/* Doctor / Medical Officer Portal */}
                  <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                  <Route path="/doctor/referrals" element={<DoctorDashboard />} />
                  <Route path="/doctor/teleconsult" element={<TeleconsultPage />} />
                  <Route path="/doctor/patients" element={<PatientsListPage />} />
                  <Route path="/doctor/patient/:id" element={<DoctorPatientView />} />
                  <Route path="/doctor/notes" element={<DoctorDashboard />} />

                  {/* Admin Portal */}
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/analytics" element={<AdminDashboard />} />
                  <Route path="/admin/facilities" element={<AdminDashboard />} />
                  <Route path="/admin/notices" element={<AdminDashboard />} />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </BrowserRouter>
            </PatientProvider>
          </SyncProvider>
        </AuthProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

export default App;

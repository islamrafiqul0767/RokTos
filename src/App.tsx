import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { Navbar } from './components/layout/Navbar.tsx';
import { Footer } from './components/layout/Footer.tsx';

// Pages
import { HomePage } from './pages/HomePage.tsx';
import { FindDonorsPage } from './pages/FindDonorsPage.tsx';
import { BloodRequestsPage } from './pages/BloodRequestsPage.tsx';
import { CreateRequestPage } from './pages/CreateRequestPage.tsx';
import { HowItWorksPage } from './pages/HowItWorksPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { SafetyPage } from './pages/SafetyPage.tsx';
import { DonorEligibilityPage } from './pages/DonorEligibilityPage.tsx';
import { FAQPage } from './pages/FAQPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { PolicyPage } from './pages/PolicyPage.tsx';
import { DonorRegisterPage } from './pages/DonorRegisterPage.tsx';
import { DashboardPage } from './pages/DashboardPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { AdminPage } from './pages/AdminPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || '/';
  });

  const [initialBloodGroupFilter, setInitialBloodGroupFilter] = useState('ALL');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '') || '/';
      setCurrentPath(hash);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const handleFilterBloodGroup = (bg: string) => {
    setInitialBloodGroupFilter(bg);
  };

  const renderCurrentView = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={navigate} onFilterBloodGroup={handleFilterBloodGroup} />;
      case '/donors':
        return <FindDonorsPage initialBloodGroup={initialBloodGroupFilter} />;
      case '/blood-requests':
        return <BloodRequestsPage onNavigate={navigate} />;
      case '/blood-requests/new':
        return <CreateRequestPage onNavigate={navigate} />;
      case '/how-it-works':
        return <HowItWorksPage onNavigate={navigate} />;
      case '/about':
        return <AboutPage />;
      case '/safety':
        return <SafetyPage />;
      case '/donor-eligibility':
        return <DonorEligibilityPage onNavigate={navigate} />;
      case '/faq':
        return <FAQPage />;
      case '/contact':
        return <ContactPage />;
      case '/privacy':
        return <PolicyPage slug="privacy" />;
      case '/terms':
        return <PolicyPage slug="terms" />;
      case '/verification-policy':
        return <PolicyPage slug="verification-policy" />;
      case '/community-guidelines':
        return <PolicyPage slug="community-guidelines" />;
      case '/accessibility':
        return <PolicyPage slug="accessibility" />;
      case '/editorial-policy':
        return <PolicyPage slug="editorial-policy" />;
      case '/donor/register':
        return <DonorRegisterPage onNavigate={navigate} />;
      case '/dashboard':
        return <DashboardPage onNavigate={navigate} />;
      case '/profile':
        return <ProfilePage />;
      case '/admin':
        return <AdminPage />;
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-emerald-100 selection:text-emerald-950">
          <Navbar currentPath={currentPath} onNavigate={navigate} />
          <main className="flex-1">
            {renderCurrentView()}
          </main>
          <Footer onNavigate={navigate} />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}

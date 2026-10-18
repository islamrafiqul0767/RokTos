import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { MedicalDisclaimerBanner } from '../common/MedicalDisclaimerBanner.tsx';
import { RoktosLogo } from '../common/RoktosLogo.tsx';
import {
  Menu,
  X,
  Search,
  PlusCircle,
  ClipboardList,
  Shield,
  HelpCircle,
  User,
  ShieldAlert,
  Globe,
  LogIn,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAdmin, isDonor, signInWithGoogle, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: language === 'bn' ? 'হোম' : 'Home' },
    { path: '/donors', label: t.searchDonors, icon: Search },
    { path: '/blood-requests', label: t.viewRequests, icon: ClipboardList },
    { path: '/blood-requests/new', label: t.createRequest, icon: PlusCircle, highlight: true },
    { path: '/how-it-works', label: t.howItWorks },
    { path: '/safety', label: t.safety, icon: Shield },
    { path: '/donor-eligibility', label: t.eligibility },
    { path: '/faq', label: t.faq, icon: HelpCircle },
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setAuthMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200">
      {/* Top medical & emergency disclaimer */}
      <MedicalDisclaimerBanner />

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('/')}
              className="flex items-center text-left group transition-opacity hover:opacity-95"
              aria-label="ROKTOS Home"
            >
              <RoktosLogo variant="horizontal" size="md" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              if (link.highlight) {
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md text-white bg-rose-700 hover:bg-rose-800 transition-colors shadow-xs"
                  >
                    {link.icon && <link.icon className="w-3.5 h-3.5" />}
                    <span>{link.label}</span>
                  </button>
                );
              }
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    isActive
                      ? 'text-rose-700 bg-rose-50 font-bold'
                      : 'text-slate-700 hover:text-rose-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right utility items: Language toggle & Auth */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <span className="font-semibold">{language === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {/* User Account / Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setAuthMenuOpen(!authMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-md hover:bg-stone-100 transition-colors border border-stone-200"
                  aria-label="User Account Menu"
                >
                  <div className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs">
                    {user.displayName ? user.displayName[0] : 'U'}
                  </div>
                  <span className="hidden sm:inline text-xs font-medium text-stone-800 max-w-[100px] truncate">
                    {user.displayName || 'Member'}
                  </span>
                </button>

                {authMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-stone-200 py-1.5 z-50 text-xs">
                    <div className="px-3 py-2 border-b border-stone-100">
                      <p className="font-bold text-stone-900 truncate">{user.displayName || 'User'}</p>
                      <p className="text-stone-500 text-[11px] truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => handleNav('/dashboard')}
                      className="w-full text-left px-3 py-2 text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-stone-500" />
                      <span>{t.dashboard}</span>
                    </button>

                    <button
                      onClick={() => handleNav('/profile')}
                      className="w-full text-left px-3 py-2 text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-stone-500" />
                      <span>{t.profile}</span>
                    </button>

                    {!isDonor && (
                      <button
                        onClick={() => handleNav('/donor/register')}
                        className="w-full text-left px-3 py-2 text-emerald-800 font-semibold hover:bg-emerald-50 flex items-center gap-2"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{language === 'bn' ? 'রক্তদাতা হিসেবে সক্রিয় হোন' : 'Become a Donor'}</span>
                      </button>
                    )}

                    {isAdmin && (
                      <button
                        onClick={() => handleNav('/admin')}
                        className="w-full text-left px-3 py-2 text-rose-800 font-semibold hover:bg-rose-50 flex items-center gap-2 border-t border-stone-100"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
                        <span>{t.adminConsole}</span>
                      </button>
                    )}

                    <div className="border-t border-stone-100 mt-1 pt-1">
                      <button
                        onClick={async () => {
                          await signOut();
                          setAuthMenuOpen(false);
                          handleNav('/');
                        }}
                        className="w-full text-left px-3 py-2 text-stone-600 hover:bg-stone-50 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5 text-stone-400" />
                        <span>{t.signOut}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md text-white bg-emerald-900 hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t.signInWithGoogle}</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-3 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNav(link.path)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium flex items-center justify-between ${
                currentPath === link.path
                  ? 'bg-emerald-50 text-emerald-900 font-bold'
                  : 'text-stone-800 hover:bg-stone-50'
              }`}
            >
              <span>{link.label}</span>
              {link.icon && <link.icon className="w-4 h-4 text-stone-400" />}
            </button>
          ))}

          {user && (
            <div className="pt-2 border-t border-stone-100 space-y-1">
              <button
                onClick={() => handleNav('/dashboard')}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-stone-800 hover:bg-stone-50"
              >
                {t.dashboard}
              </button>
              <button
                onClick={() => handleNav('/profile')}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-stone-800 hover:bg-stone-50"
              >
                {t.profile}
              </button>
              {isAdmin && (
                <button
                  onClick={() => handleNav('/admin')}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-bold text-rose-700 bg-rose-50"
                >
                  {t.adminConsole}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

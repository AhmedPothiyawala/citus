import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { PageTitle } from './components/PageTitle';
import { ScrollReveal } from './components/ScrollReveal';

// Page components
import { HomePage } from './pages/HomePage';
import { CompanyProfilePage } from './pages/CompanyProfilePage';
import { WhyUsPage } from './pages/WhyUsPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { PartnersPage } from './pages/PartnersPage';
import { ProductsPage } from './pages/ProductsPage';
import { DigitalServicesPage } from './pages/DigitalServicesPage';
import { NetworkingPage } from './pages/NetworkingPage';
import { FttxPage } from './pages/FttxPage';
import { ServerStoragePage } from './pages/ServerStoragePage';
import { DataCenterCloudPage } from './pages/DataCenterCloudPage';
import { IndustryApplicationsPage } from './pages/IndustryApplicationsPage';
import { SecuritySolutionsPage } from './pages/SecuritySolutionsPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { RakutenMobilePage } from './pages/RakutenMobilePage';
import { NepalTelecomPage } from './pages/NepalTelecomPage';
import { NetBroadbandPage } from './pages/NetBroadbandPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';

export const AppContent: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <PageTitle />
      <ScrollReveal />
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/company-profile" element={<CompanyProfilePage />} />
            <Route path="/company-profile/" element={<CompanyProfilePage />} />
            <Route path="/why-us" element={<WhyUsPage />} />
            <Route path="/why-us/" element={<WhyUsPage />} />
            <Route path="/leadership" element={<LeadershipPage />} />
            <Route path="/leadership/" element={<LeadershipPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/partners/" element={<PartnersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/" element={<ProductsPage />} />
            <Route path="/digital-services" element={<DigitalServicesPage />} />
            <Route path="/digital-services/" element={<DigitalServicesPage />} />
            <Route path="/networking" element={<NetworkingPage />} />
            <Route path="/networking/" element={<NetworkingPage />} />
            <Route path="/fttx" element={<FttxPage />} />
            <Route path="/fttx/" element={<FttxPage />} />
            <Route path="/server-storage" element={<ServerStoragePage />} />
            <Route path="/server-storage/" element={<ServerStoragePage />} />
            <Route path="/data-center-cloud" element={<DataCenterCloudPage />} />
            <Route path="/data-center-cloud/" element={<DataCenterCloudPage />} />
            <Route path="/industry-applications" element={<IndustryApplicationsPage />} />
            <Route path="/industry-applications/" element={<IndustryApplicationsPage />} />
            <Route path="/security-solutions" element={<SecuritySolutionsPage />} />
            <Route path="/security-solutions/" element={<SecuritySolutionsPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/" element={<CaseStudiesPage />} />
            <Route path="/category/case-studies" element={<CaseStudiesPage />} />
            <Route path="/category/case-studies/" element={<CaseStudiesPage />} />
            <Route path="/rakuten-mobile" element={<RakutenMobilePage />} />
            <Route path="/rakuten-mobile/" element={<RakutenMobilePage />} />
            <Route path="/nepal-telecom" element={<NepalTelecomPage />} />
            <Route path="/nepal-telecom/" element={<NepalTelecomPage />} />
            <Route path="/net-broadband" element={<NetBroadbandPage />} />
            <Route path="/net-broadband/" element={<NetBroadbandPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact/" element={<ContactPage />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;

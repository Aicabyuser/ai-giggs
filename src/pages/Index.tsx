
import React, { useEffect } from 'react';
import AppHeader from '@/components/AppHeader';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import DeveloperShowcase from '@/components/DeveloperShowcase';
import UseCases from '@/components/UseCases';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for header
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Animate elements on scroll - fixed to make sure sections are visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0'); // Remove opacity-0 when visible
        }
      });
    }, { threshold: 0.1 });
    
    // Initialize all sections with opacity-0 but add a small delay before applying
    // to ensure they're initially visible if JS doesn't load
    setTimeout(() => {
      document.querySelectorAll('section').forEach(section => {
        section.classList.add('opacity-0');
        observer.observe(section);
      });
    }, 100);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <AppHeader />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <DeveloperShowcase />
        <UseCases />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

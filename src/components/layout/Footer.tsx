
import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-brand-gray-500 hover:text-brand-blue transition-colors">
    {children}
  </Link>
);

const FooterHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-semibold text-brand-gray-900 mb-4">{children}</h3>
);

export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-gray-200">
      <div className="container-tight py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo className="mb-4" />
            <p className="text-brand-gray-500 mb-4">
              Connecting you with licensed therapists for convenient and effective online therapy sessions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-gray-400 hover:text-brand-blue">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-brand-gray-400 hover:text-brand-blue">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-brand-gray-400 hover:text-brand-blue">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-brand-gray-400 hover:text-brand-blue">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-2">
              <li><FooterLink to="/about">About Us</FooterLink></li>
              <li><FooterLink to="/careers">Careers</FooterLink></li>
              <li><FooterLink to="/contact">Contact Us</FooterLink></li>
              <li><FooterLink to="/press">Press</FooterLink></li>
            </ul>
          </div>

          <div>
            <FooterHeading>Resources</FooterHeading>
            <ul className="space-y-2">
              <li><FooterLink to="/blog">Blog</FooterLink></li>
              <li><FooterLink to="/faq">FAQs</FooterLink></li>
              <li><FooterLink to="/resources">Mental Health Resources</FooterLink></li>
              <li><FooterLink to="/insurance">Insurance Info</FooterLink></li>
            </ul>
          </div>

          <div>
            <FooterHeading>Legal</FooterHeading>
            <ul className="space-y-2">
              <li><FooterLink to="/terms">Terms of Service</FooterLink></li>
              <li><FooterLink to="/privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink to="/hipaa">HIPAA Compliance</FooterLink></li>
              <li><FooterLink to="/accessibility">Accessibility</FooterLink></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-brand-gray-500 text-sm">
            © {new Date().getFullYear()} Sukooni. All rights reserved.
          </p>
          <p className="text-brand-gray-500 text-sm mt-2 md:mt-0">
            If you are in crisis, please call or text the 24/7 Suicide & Crisis Lifeline at +971 4 393 0009 anytime.
          </p>
        </div>
      </div>
    </footer>
  );
}

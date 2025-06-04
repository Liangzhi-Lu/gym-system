import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Dumbbell } from 'lucide-react';

const FooterLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-gray-400 hover:text-primary transition-colors duration-150"
  >
    <Icon className="w-6 h-6" />
  </a>
);

const MainFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
      <div></div>
  );
};

export default MainFooter; 
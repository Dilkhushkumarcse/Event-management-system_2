import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" text-white py-8 mt-auto">
     
     <footer class="bg-gray-900 text-gray-300 px-6 py-8">
  <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    <div>
      <h2 class="text-xl font-bold text-white mb-4">EventHub</h2>
      <p class="text-sm">Seamlessly create, manage, and discover events with ease.</p>
    </div>
    <div>
      <h3 class="text-lg font-semibold text-white mb-3">Quick Links</h3>
      <ul class="space-y-2 text-sm">
        <li><a href="/" class="hover:text-white">Home</a></li>
        <li><a href="/events" class="hover:text-white">Events</a></li>
        <li><a href="/create" class="hover:text-white">Create Event</a></li>
        <li><a href="/contact" class="hover:text-white">Contact</a></li>
      </ul>
    </div>
    <div>
      <h3 class="text-lg font-semibold text-white mb-3">Support</h3>
      <ul class="space-y-2 text-sm">
        <li><a href="/faq" class="hover:text-white">FAQ</a></li>
        <li><a href="/privacy" class="hover:text-white">Privacy Policy</a></li>
        <li><a href="/terms" class="hover:text-white">Terms & Conditions</a></li>
      </ul>
    </div>
    <div>
      <h3 class="text-lg font-semibold text-white mb-3">Follow Us</h3>
      <div class="flex space-x-4">
        <a href="#" class="hover:text-white"><i class="fab fa-facebook-f"></i> Facebook</a>
        <a href="#" class="hover:text-white"><i class="fab fa-twitter"></i> Twitter</a>
        <a href="#" class="hover:text-white"><i class="fab fa-instagram"></i> Instagram</a>
      </div>
    </div>
  </div>
  <div class="mt-8 text-center text-sm text-gray-500">
    © 2025 EventHub. All rights reserved.
  </div>
</footer>

    </footer>
  );
};

export default Footer;

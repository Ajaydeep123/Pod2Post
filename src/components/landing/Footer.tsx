import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 py-8 shadow-[0_-1px_3px_-1px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 2024 Pod2Post. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-sm hover:text-gray-900 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm hover:text-gray-900 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-sm hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
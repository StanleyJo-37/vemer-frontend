"use client";

import { Handshake, MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Handshake className="h-6 w-6 text-sky-400" />
                <span className="text-xl font-bold">Vemer</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting people with meaningful activities that develop skills and create positive impact.
              </p>
              <div className="flex gap-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <Link
                    key={social}
                    href={`#${social}`}
                    className="bg-gray-800 hover:bg-sky-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-5 w-5 bg-gray-400 rounded-full"></div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["Home", "Activities", "Dashboard", "Leaderboard"].map((link) => (
                  <li key={link}>
                    {link == "About" && 
                      <Link href="#" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">
                        {link}
                      </Link>
                    }
                    {link == "Activities" &&
                      <Link href="/activities" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">
                        {link}
                      </Link>
                    }
                    {link == "Dashboard" &&
                      <Link href="/user-dashboard" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">
                        {link}
                      </Link>
                    }
                    {link == "Leaderboard" &&
                      <Link href="/leaderboard" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">
                        {link}
                      </Link>
                    }
                  </li>
                ))}
              </ul>
            </div>

            {/* <div>
              <h3 className="font-semibold text-lg mb-4">Activity Types</h3>
              <ul className="space-y-2">
                {[
                  "Workshops",
                  "Volunteer Events",
                  "Skill Development",
                  "Community Projects",
                  "Social Gatherings",
                  "Virtual Events",
                ].map((type) => (
                  <li key={type}>
                    <Link href="#" className="text-gray-400 hover:text-sky-400 transition-colors duration-300">
                      {type}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}

            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-sky-400 mr-2" />
                  <span className="text-gray-400">Jl. Jalur Sutera Bar. No.Kav. 21, RT.001/RW.004, Panunggangan, Kec. Pinang, Kota Tangerang, Banten 15143</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-sky-400 mr-2" />
                  <Link href="mailto:vemer@gmail.com" className="text-gray-400 hover:text-sky-400">
                    vemer@gmail.com
                  </Link>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-sky-400 mr-2" />
                  <Link href="tel:+628123456789" className="text-gray-400 hover:text-sky-400">
                    (62) 8123456789
                  </Link>
                </li>
              </ul>
              <div className="mt-4">
                <Button variant="outline" className="border-sky-400 text-sky-400 hover:bg-gray-800">
                  Partner With Us
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Vemer. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="#" className="text-gray-500 hover:text-sky-400 text-sm">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-500 hover:text-sky-400 text-sm">
                  Terms of Service
                </Link>
                <Link href="#" className="text-gray-500 hover:text-sky-400 text-sm">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
}
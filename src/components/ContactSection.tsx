import React from 'react';
import { WebsiteConfig } from '../types';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Navigation } from 'lucide-react';

interface ContactSectionProps {
  config: WebsiteConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${config.instituteName}, ${config.address}, ${config.city}, ${config.state} ${config.pincode}`
  )}`;

  return (
    <section id="contact" className="py-20 sm:py-24 bg-gradient-to-b from-[#07152F] via-[#091F47] to-[#07152F] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] tracking-widest uppercase mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Our Center</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact & Location Details
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Visit our center in Dewas for batch counseling, course materials review, and direct meeting with Swapnil Sir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
            {/* Address Card */}
            <div className="glass-card p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2.5 text-[#38BDF8]">
                <MapPin className="w-5 h-5" />
                <h3 className="font-heading font-bold text-base text-white">Center Address</h3>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {config.instituteName}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {config.address}, {config.city}, {config.state} — {config.pincode}
              </p>
              <div className="pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] hover:text-white hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Direct Phone & WhatsApp */}
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-2.5 text-[#38BDF8]">
                <Phone className="w-5 h-5" />
                <h3 className="font-heading font-bold text-base text-white">Direct Academic Line</h3>
              </div>
              <p className="text-xs text-slate-300">
                Contact Swapnil Sir directly for seat queries, batch schedules, and student mentoring.
              </p>
              <div className="text-xl font-extrabold font-mono text-white tracking-wide">
                {config.phone}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={`tel:${config.phone.replace(/\s+/g, '')}`}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl flex items-center gap-2 shadow transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Click to Call</span>
                </a>
                <a
                  href={`https://wa.me/919752804711?text=Hello%20Swapnil%20Sir,%20I%20would%20like%20to%20connect%20regarding%20coaching%20at%20V.G%20TUTORIAL%20DEWAS.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-2 shadow transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Message</span>
                </a>
              </div>
            </div>

            {/* Timings */}
            <div className="glass-card p-6 rounded-2xl space-y-2">
              <div className="flex items-center gap-2.5 text-[#38BDF8]">
                <Clock className="w-5 h-5" />
                <h3 className="font-heading font-bold text-base text-white">Center Timings</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {config.openingHours}
              </p>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed & Center Guidance */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="glass-card rounded-2xl overflow-hidden p-2 flex-1 flex flex-col">
              {/* Map embed iframe */}
              <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-slate-900 relative">
                <iframe
                  title="V.G TUTORIAL DEWAS Location Map"
                  src="https://maps.google.com/maps?q=Mukherjee%20Nagar,%20Nagar%20Nigam%20Colony,%20Dewas,%20Madhya%20Pradesh%20455001&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter brightness-90 contrast-125"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-[#07152F]/90 backdrop-blur-md border border-[#38BDF8]/30 text-xs font-bold text-white shadow-lg">
                  📍 Dewas, Madhya Pradesh 455001
                </div>
              </div>

              {/* Landmark guidance text */}
              <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
                <div>
                  <span className="font-bold text-white block">Prominent Landmark:</span>
                  <span>Mukherjee Nagar, Nagar Nigam Colony, easily accessible from all major points in Dewas.</span>
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#0F2D5F] hover:bg-[#145DFF] text-white font-semibold transition-colors shrink-0 flex items-center gap-1.5 border border-[#38BDF8]/30"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

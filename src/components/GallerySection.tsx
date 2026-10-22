import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Camera, Maximize2, X } from 'lucide-react';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Classroom', 'Doubt Sessions', 'Guidance'];

  const filteredGallery = selectedCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-gradient-to-b from-[#07152F] via-[#081C3F] to-[#07152F] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] tracking-widest uppercase mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Center Tour</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Classroom & Learning Space
            </h2>
            <p className="mt-2 text-slate-300 text-sm max-w-xl">
              Take a visual tour inside V.G TUTORIAL DEWAS at Mukherjee Nagar, equipped with modern study amenities.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0F2D5F]/60 border border-[#38BDF8]/20 self-start md:self-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#145DFF] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden group cursor-pointer relative flex flex-col"
            >
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-[#07152F]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#07152F]/80 backdrop-blur-md text-[10px] font-bold text-[#8BD9FF] border border-[#38BDF8]/20">
                  {item.category}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-sm text-white group-hover:text-[#8BD9FF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full-screen Lightbox Modal */}
        {activeImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#07152F] rounded-2xl border border-[#38BDF8]/30 overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activeImage.imageUrl}
                  alt={activeImage.title}
                  className="max-h-[75vh] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setActiveImage(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors"
                  aria-label="Close photo"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider block">
                    {activeImage.category}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white">
                    {activeImage.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {activeImage.caption}
                  </p>
                </div>
                <button
                  onClick={() => setActiveImage(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

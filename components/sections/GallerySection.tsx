"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/lib/constants";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openItem = GALLERY_ITEMS.find((g) => g.id === lightbox);

  return (
    <section id="gallery" className="relative section-padding overflow-hidden">
      <div
        className="absolute right-0 top-1/4 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,107,157,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeUp}
            className="font-poppins text-sm tracking-[0.3em] text-pink/70 uppercase mb-4"
          >
            Our Photo Collection
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6"
          >
            Moments{" "}
            <span className="text-purple-gradient">Captured</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-inter text-base text-white/50 max-w-md mx-auto"
          >
            Every picture tells a story of love, laughter, and belonging
          </motion.p>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink/40" />
            <span className="text-pink text-xl">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink/40" />
          </motion.div>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          className="masonry-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {GALLERY_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              variants={scaleIn}
              className="masonry-item"
            >
              <motion.div
                className={`relative ${item.height} rounded-2xl overflow-hidden cursor-pointer group`}
                style={{
                  background: `linear-gradient(135deg, ${item.gradient.replace("from-", "").replace("to-", "")})`,
                }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setLightbox(item.id)}
                data-hover
              >
                {/* Image or Gradient fallback */}
                {(item as any).image ? (
                  <>
                    <Image
                      src={(item as any).image}
                      alt={item.label}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: (item as any).objectPosition ?? "center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                  </>
                ) : (
                  <>
                    {/* Gradient background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                      style={{ opacity: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

                    {/* Emoji placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl md:text-5xl opacity-60 group-hover:scale-110 transition-transform duration-500">
                        {item.emoji}
                      </span>
                    </div>
                  </>
                )}

                {/* Glass hover overlay */}
                <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="font-poppins text-sm font-semibold text-gold">{item.label}</p>
                    <p className="font-inter text-xs text-white/60">Click to view</p>
                  </div>
                </div>

                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ border: "1px solid rgba(255,209,102,0.3)" }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && openItem && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative glass rounded-3xl p-8 max-w-lg w-full mx-6 flex flex-col items-center text-center"
              style={{ border: "1px solid rgba(255,209,102,0.3)" }}
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                className="absolute top-4 right-4 text-white/50 hover:text-gold transition-colors"
                onClick={() => setLightbox(null)}
                data-hover
              >
                <X size={22} />
              </button>

              {/* Content */}
              {(openItem as any).image ? (
                <div className="relative w-full h-64 rounded-2xl mb-6 overflow-hidden">
                  <Image
                    src={(openItem as any).image}
                    alt={openItem.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 512px"
                    className="object-contain"
                    style={{ objectPosition: (openItem as any).objectPosition ?? "center" }}
                  />
                </div>
              ) : (
                <div
                  className={`w-full h-64 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${openItem.gradient}`}
                  style={{ opacity: 0.8 }}
                >
                  <span className="text-7xl">{openItem.emoji}</span>
                </div>
              )}

              <h3 className="font-playfair text-2xl font-bold text-gold mb-2">
                {openItem.label}
              </h3>
              <p className="font-inter text-sm text-white/50">
                A cherished memory with Bhargavi, Akshara &amp; SriNayani 💛
              </p>

             
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

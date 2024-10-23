/* eslint-disable @next/next/no-img-element */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    image: string;
    description: string;
  };
}

export function ImageModal({ isOpen, onClose, image }: ImageModalProps) {
  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      // Restore scrolling when modal is closed
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl border border-secondary bg-primary shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-2 top-2 rounded-full bg-primary/80 p-2 text-white transition-colors hover:bg-secondary"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <img
              src={image.image}
              alt={image.description}
              className="max-h-[80vh] w-full object-contain"
            />

            {image.description && (
              <div className="border-t border-secondary bg-primary p-4">
                <p className="text-sm text-neutral">{image.description}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

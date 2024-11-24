"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { Button } from "@/components/ui/button";
import { ArrowDown, MessageSquare } from 'lucide-react';
export function HeroHighlightDemo() {
  return (
    (<HeroHighlight>
      <motion.h1
            className="text-4xl font-bold mb-4 z-0"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to ExportEase
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Your AI-powered compliance assistant
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button size="lg" className="text-lg px-8 py-6">
              <MessageSquare className="mr-2 h-5 w-5" />
              Try it now
            </Button>
          </motion.div>
    </HeroHighlight>)
  );
}

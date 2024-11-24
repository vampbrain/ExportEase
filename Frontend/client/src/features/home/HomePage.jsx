import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowDown, MessageSquare } from 'lucide-react';
import { GlobeDemo } from "../../components/main/globe";
import { HeroHighlightDemo } from '../../components/main/herohighlight';
import FAQChatbot from '../../components/FAQ/FAQChatbot';
import ModernFAQChatbot from '../../components/FAQ/FAQChatbot';
import CustomChatbot from '../../components/FAQ/FAQChatbot';

const AnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      {children}
    </motion.div>
  );
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
    {/* Background Component */}
    
      <HeroHighlightDemo />
    
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center text-center px-4">
        <div>
          
          
          {/* Globe Section */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <GlobeDemo />
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <ArrowDown className="mx-auto h-8 w-8 animate-bounce" />
            <p className="text-sm text-muted-foreground">Scroll to learn more</p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedSection>
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">About Our Compliance Chatbot</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Instant Answers</h3>
                <p>Get immediate responses to your compliance questions, powered by advanced AI technology.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Always Up-to-Date</h3>
                <p>Our chatbot is constantly updated with the latest regulations and compliance information.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Personalized Guidance</h3>
                <p>Receive tailored advice based on your specific industry and compliance needs.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">24/7 Availability</h3>
                <p>Access compliance support anytime, anywhere, ensuring you're always compliant.</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Call to Action Section */}
      <AnimatedSection>
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to streamline your compliance process?</h2>
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started Now
            </Button>
          </div>
        </section>
      </AnimatedSection>
    </div>
    <CustomChatbot/>
    </div>
  );
}

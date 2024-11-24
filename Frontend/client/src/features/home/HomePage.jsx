import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowDown, MessageSquare, DollarSign, Globe, TrendingUp, Truck } from 'lucide-react';
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
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="flex-grow flex items-center justify-center text-center px-4 pt-20">
          <div>
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
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/compliance">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Try it now
                </Link>
              </Button>
            </motion.div>
            
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

        {/* Price Estimation Features Section */}
        <AnimatedSection>
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Price Estimation Features</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start">
                  <DollarSign className="mr-4 h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Cost Calculator</h3>
                    <p>Estimate export costs for your shipment with our advanced calculator, taking into account various factors such as destination, weight, and shipping method.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="mr-4 h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Destination Guide</h3>
                    <p>Access comprehensive information on export costs for different destinations, including customs duties, taxes, and other location-specific charges.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="mr-4 h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Price Trends</h3>
                    <p>Stay informed about export cost trends with our historical data analysis, helping you make informed decisions and plan your exports more effectively.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Truck className="mr-4 h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Shipping Services Comparison</h3>
                    <p>Compare costs across different shipping services and methods to find the most cost-effective option for your export needs.</p>
                  </div>
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
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/login">
                  Get Started Now
                </Link>
              </Button>
            </div>
          </section>
        </AnimatedSection>
      </div>

      {/* Footer */}
      <footer className="bg-black-100 dark:bg-gray-900 py-4">
        <div className="container mx-auto px-3 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Developed by Bharathi R, J M Tarun, Aswin Raaj and S Yogesh
          </p>
        </div>
      </footer>

      <CustomChatbot/>
    </div>
  );
}
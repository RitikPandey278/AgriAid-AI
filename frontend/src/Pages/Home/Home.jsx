import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import {
  Scan,
  CloudRain,
  Lightbulb,
  BookOpen,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

// Custom hook for Intersection Observer
const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return isIntersecting;
};

// Custom CSS for animations
const customStyles = `
  .slide-in-left { transform: translateX(-100%); opacity: 0; transition: transform 1.2s ease-out, opacity 1.2s ease-out; }
  .slide-in-right { transform: translateX(100%); opacity: 0; transition: transform 1.2s ease-out, opacity 1.2s ease-out; }
  .slide-in-visible { transform: translateX(0); opacity: 1; }
  .fade-in-up { transform: translateY(50px); opacity: 0; transition: transform 1.2s ease-out, opacity 1.2s ease-out; }
  .fade-in-visible { transform: translateY(0); opacity: 1; }
  .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.2); }
`;

export default function HomePage() {
  const features = [
    { icon: Scan, title: "Crop Disease Detection", description: "Upload photos of your crops and get instant AI-powered diagnosis with treatment recommendations.", link: "/disease-detection", color: "bg-blue-100 text-blue-600" },
    { icon: CloudRain, title: "Weather & Disaster Alerts", description: "Real-time weather updates and early warnings for storms, floods, and other natural disasters.", link: "/weather", color: "bg-orange-100 text-orange-600" },
    { icon: Lightbulb, title: "Expert Suggestions", description: "Get personalized farming tips and best practices from agricultural experts and AI.", link: "/suggestions", color: "bg-green-100 text-green-600" },
    { icon: BookOpen, title: "Knowledge Base", description: "Access comprehensive guides, articles, and tutorials on modern farming techniques.", link: "/knowledge-base", color: "bg-purple-100 text-purple-600" },
  ];

  const benefits = [
    "Free to use for all farmers",
    "Works in multiple languages",
    "Expert-verified information",
    "24/7 availability",
    "No technical knowledge required",
    "Regular updates and new features",
  ];

  // Refs for all sections
  const heroLeftRef = useRef(null);
  const heroRightRef = useRef(null);
  const featuresHeaderRef = useRef(null);
  const howItWorksHeaderRef = useRef(null);
  const benefitsLeftRef = useRef(null);
  const benefitsRightRef = useRef(null);
  const ctaRef = useRef(null);

  // Intersection states
  const isHeroLeftVisible = useIntersectionObserver(heroLeftRef);
  const isHeroRightVisible = useIntersectionObserver(heroRightRef);
  const isFeaturesHeaderVisible = useIntersectionObserver(featuresHeaderRef);
  const isHowItWorksHeaderVisible = useIntersectionObserver(howItWorksHeaderRef);
  const isBenefitsLeftVisible = useIntersectionObserver(benefitsLeftRef);
  const isBenefitsRightVisible = useIntersectionObserver(benefitsRightRef);
  const isCtaVisible = useIntersectionObserver(ctaRef);

  return (
    <div className="min-h-screen">
      <style>{customStyles}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-green-100 py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div ref={heroLeftRef} className={`slide-in-left ${isHeroLeftVisible ? 'slide-in-visible' : ''}`}>
              <h1 className="text-5xl font-bold text-green-700 mb-6 leading-tight">
                Welcome to AgriAid
              </h1>
              <h2 className="text-2xl text-gray-800 mb-8 font-semibold">
                Empowering Farmers with Smart Technology
              </h2>
              <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
                Get instant crop health diagnosis, weather alerts, expert farming advice, and comprehensive agricultural guidance - all in one platform designed for farmers.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/signup">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow-lg hover-lift transition-all">
                    Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/disease-detection">
                  <Button variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg shadow-md hover-lift transition-all">
                    Try Disease Detection
                  </Button>
                </Link>
              </div>
            </div>

            <div ref={heroRightRef} className={`slide-in-right ${isHeroRightVisible ? 'slide-in-visible' : ''} relative`}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1723459579545-43ea890524f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Farmer in field with crops"
                className="rounded-2xl shadow-2xl w-full hover-lift"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-200/20 to-transparent rounded-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={featuresHeaderRef} className={`text-center mb-16 fade-in-up ${isFeaturesHeaderVisible ? 'fade-in-visible' : ''}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to protect your crops and improve your farming practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.title} to={feature.link}>
                  <Card className={`h-full hover:shadow-xl transition-all duration-300 cursor-pointer group hover-lift fade-in-up fade-in-visible`} style={{ animationDelay: `${index * 0.2}s` }}>
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={howItWorksHeaderRef} className={`text-center mb-16 fade-in-up ${isHowItWorksHeaderVisible ? 'fade-in-visible' : ''}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Simple steps to get started with AgriAid</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { step: 1, title: "Sign Up", desc: "Create your free account in seconds" },
              { step: 2, title: "Choose Service", desc: "Select disease detection, weather, or expert tips" },
              { step: 3, title: "Get Results", desc: "Receive instant insights and recommendations" },
            ].map((item, index) => (
              <div key={item.step} className={`text-center fade-in-up fade-in-visible hover-lift`} style={{ animationDelay: `${index * 0.3}s` }}>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">{item.step}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div ref={benefitsLeftRef} className={`slide-in-left ${isBenefitsLeftVisible ? 'slide-in-visible' : ''}`}>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Why Choose AgriAid?</h2>
              <div className="grid grid-cols-1 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={benefit} className="flex items-start gap-4 fade-in-up fade-in-visible" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <p className="text-lg text-gray-700 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div ref={benefitsRightRef} className={`slide-in-right ${isBenefitsRightVisible ? 'slide-in-visible' : ''}`}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Shield, color: "bg-green-50 border-green-200 text-green-700", title: "10K+", desc: "Protected Farms" },
                  { icon: Users, color: "bg-blue-50 border-blue-200 text-blue-700", title: "50K+", desc: "Active Farmers" },
                  { icon: Scan, color: "bg-orange-50 border-orange-200 text-orange-700", title: "100K+", desc: "Disease Scans" },
                  { icon: BookOpen, color: "bg-purple-50 border-purple-200 text-purple-700", title: "500+", desc: "Expert Articles" },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={stat.title} className={`${stat.color} border-2 hover-lift fade-in-up fade-in-visible`} style={{ animationDelay: `${index * 0.2}s` }}>
                      <CardHeader className="text-center pb-4">
                        <Icon className="w-10 h-10 mx-auto mb-3" />
                        <CardTitle className="text-3xl font-bold">{stat.title}</CardTitle>
                        <CardDescription className="text-sm font-medium">{stat.desc}</CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
        <div ref={ctaRef} className={`container mx-auto px-4 md:px-6 text-center relative z-10 fade-in-up ${isCtaVisible ? 'fade-in-visible' : ''}`}>
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of farmers who are already using AgriAid to protect their crops and increase yields
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="bg-white text-green-700 hover:bg-gray-100 px-10 py-4 rounded-lg shadow-xl hover-lift transition-all">
              Start Free Today <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

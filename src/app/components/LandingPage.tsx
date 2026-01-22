import { Link } from 'react-router-dom';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ArrowRight, Users, TrendingUp, Award } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Veridia</h1>
          </div>
          <Link
            to="/login"
            className="px-4 py-2 text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
              Join Veridia – We're Hiring
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Build Your Career with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Veridia
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Join a forward-thinking tech company where innovation meets opportunity. We're looking for talented individuals to help us shape the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl group"
              >
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 rounded-xl border-2 border-emerald-600 hover:bg-emerald-50 transition-all"
              >
                Login to Portal
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl rotate-3"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3Njg0NDg4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Team collaboration"
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Veridia?
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer more than just a job – we offer a career path filled with growth and opportunities
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-emerald-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              Collaborative Culture
            </h4>
            <p className="text-gray-600">
              Work with talented professionals in a supportive environment that values teamwork and innovation.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-sky-100 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-7 h-7 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              Career Growth
            </h4>
            <p className="text-gray-600">
              Access continuous learning opportunities and clear career progression paths tailored to your goals.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-7 h-7 text-emerald-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              Recognition & Rewards
            </h4>
            <p className="text-gray-600">
              Competitive compensation, comprehensive benefits, and recognition programs that celebrate your achievements.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-16">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-center shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join Our Team?
          </h3>
          <p className="text-emerald-50 text-lg mb-8 max-w-2xl mx-auto">
            Take the first step towards an exciting career at Veridia. Apply today and let's build something amazing together.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
          >
            Start Your Application
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">
              © 2026 Veridia. All rights reserved.
            </p>
            <div className="flex gap-6 text-gray-600">
              <a href="#" className="hover:text-emerald-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-emerald-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-emerald-600 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

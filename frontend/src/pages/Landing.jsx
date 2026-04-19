import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Code2, 
  Shield, 
  Brain, 
  ArrowRight,
  CheckCircle,
  Zap,
  BarChart3
} from 'lucide-react'

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning models analyze your code for potential bugs and risks.'
    },
    {
      icon: Shield,
      title: 'Risk Prediction',
      description: 'Get detailed risk scores and identify problematic areas before they cause issues.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant analysis with real-time feedback and actionable insights.'
    },
    {
      icon: BarChart3,
      title: 'Detailed Metrics',
      description: 'Comprehensive code metrics including complexity, nesting depth, and more.'
    }
  ]

  const benefits = [
    'Reduce debugging time by up to 60%',
    'Improve code quality and maintainability',
    'Identify security vulnerabilities early',
    'Track code quality over time',
    'Team collaboration features',
    'Integration with popular workflows'
  ]

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #faf7ee, #dcf9fe)' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="p-3 bg-white rounded-full shadow-lg"
              >
                <Code2 className="w-12 h-12" style={{ color: '#336699' }} />
              </motion.div>
            </div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ color: '#2f4858' }}
            >
              CodeSage
              <span className="block text-2xl md:text-3xl font-normal mt-2" style={{ color: '#4b5563' }}>
                AI-Powered Code Analysis & Bug Risk Prediction
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl mb-8 max-w-3xl mx-auto"
              style={{ color: '#4b5563' }}
            >
              Leverage cutting-edge machine learning to identify potential bugs, 
              assess code quality, and predict risks before they impact your production environment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/signup"
                className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center group"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="btn-secondary text-lg px-8 py-3 inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#2f4858' }}>
              Why Choose CodeSage?
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#4b5563' }}>
              Built with the latest AI research to help developers write better, more reliable code.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full" style={{ backgroundColor: '#dde9f3' }}>
                    <feature.icon className="w-8 h-8" style={{ color: '#336699' }} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#2f4858' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#4b5563' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20" style={{ backgroundColor: '#f0fcff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#2f4858' }}>
                Transform Your Development Workflow
              </h2>
              <p className="text-xl mb-8" style={{ color: '#4b5563' }}>
                CodeSage integrates seamlessly into your existing workflow, providing actionable insights that help you ship better code faster.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" style={{ color: '#9ee493' }} />
                    <span style={{ color: '#374151' }}>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-2xl shadow-2xl" style={{ background: 'linear-gradient(to bottom right, #336699, #86bbd8)' }}>
                <div className="flex items-center justify-center h-96">
                  <div className="text-white text-center">
                    <Code2 className="w-24 h-24 mx-auto mb-4" />
                    <p className="text-2xl font-semibold">Smart Code Analysis</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ background: 'linear-gradient(to right, #336699, #86bbd8)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Improve Your Code Quality?
            </h2>
            <p className="text-xl mb-8" style={{ color: '#dcf9fe' }}>
              Join thousands of developers who trust CodeSage for their code analysis needs.
            </p>
            <Link
              to="/signup"
              className="text-lg font-semibold px-8 py-3 rounded-lg inline-flex items-center group transition-colors duration-200"
              style={{ backgroundColor: 'white', color: '#336699' }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#faf7ee'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white'
              }}
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Landing

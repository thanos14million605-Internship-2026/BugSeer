import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Brain, 
  Shield, 
  Zap, 
  BarChart3,
  Code2,
  Users,
  Award,
  Target,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced ML Models',
      description: 'Our system uses state-of-the-art Random Forest classifiers trained on thousands of code repositories to identify potential bugs and risks.'
    },
    {
      icon: Shield,
      title: 'Comprehensive Analysis',
      description: 'We analyze multiple code quality metrics including cyclomatic complexity, nesting depth, function length, and more.'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Get instant feedback on your code quality with our optimized analysis pipeline that processes files in seconds.'
    },
    {
      icon: BarChart3,
      title: 'Actionable Insights',
      description: 'Receive detailed recommendations and risk assessments to help you write better, more maintainable code.'
    }
  ]

  const metrics = [
    { number: '10K+', label: 'Code Files Analyzed' },
    { number: '95%', label: 'Accuracy Rate' },
    { number: '50+', label: 'Risk Factors' },
    { number: '24/7', label: 'Availability' }
  ]

  const methodology = [
    {
      title: 'Data Collection',
      description: 'We analyze thousands of open-source Python repositories to build a comprehensive dataset of code patterns and bug occurrences.',
      icon: Target
    },
    {
      title: 'Feature Engineering',
      description: 'Our system extracts over 50 different code metrics including complexity, structure, and style indicators.',
      icon: BarChart3
    },
    {
      title: 'Model Training',
      description: 'Random Forest models are trained using cross-validation techniques to ensure robust bug prediction capabilities.',
      icon: Brain
    },
    {
      title: 'Continuous Learning',
      description: 'Our models are regularly updated with new data to improve accuracy and adapt to evolving coding practices.',
      icon: Zap
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-sage-600 text-white">
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
                className="p-4 bg-white/10 rounded-full backdrop-blur-sm"
              >
                <Code2 className="w-12 h-12" />
              </motion.div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About CodeSage
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
              Pioneering AI-powered code analysis to help developers write better, more reliable software.
            </p>
            
            <Link
              to="/signup"
              className="inline-flex items-center bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {metric.number}
                </div>
                <div className="text-gray-600">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why CodeSage Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our technology combines cutting-edge machine learning with deep software engineering expertise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Research Methodology
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A systematic approach to building reliable bug prediction models.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodology.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="p-4 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built With Modern Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform leverages cutting-edge tools and frameworks for optimal performance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="card text-center"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Frontend</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  React 18
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  TailwindCSS
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Framer Motion
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Vite
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="card text-center"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Backend</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Node.js
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Express
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  PostgreSQL
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  FastAPI
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="card text-center"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Machine Learning</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Scikit-learn
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Random Forest
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Python
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Pandas
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
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
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of developers who trust CodeSage for their code analysis needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg inline-flex items-center justify-center group transition-colors duration-200"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/home"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-3 rounded-lg inline-flex items-center justify-center transition-colors duration-200"
              >
                Try Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About

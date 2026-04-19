import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  Link, 
  Code2, 
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { analysisAPI } from '../services/api'
import toast from 'react-hot-toast'

const Home = () => {
  const [activeTab, setActiveTab] = useState('upload')
  const [code, setCode] = useState('')
  const [repoUrl, setRepoUrl] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'text/x-python') {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCode(event.target.result)
      }
      reader.readAsText(file)
    } else {
      toast.error('Please upload a Python file (.py)')
    }
  }

  const handleAnalyze = async () => {
    if (activeTab === 'upload' && !code.trim()) {
      toast.error('Please upload or paste some code')
      return
    }
    if (activeTab === 'repo' && !repoUrl.trim()) {
      toast.error('Please enter a repository URL')
      return
    }

    setAnalyzing(true)
    try {
      const response = await analysisAPI.analyze({
        code: activeTab === 'upload' ? code : undefined,
        repo_url: activeTab === 'repo' ? repoUrl : undefined
      })
      
      setResult(response.data.result)
      toast.success('Analysis completed successfully!')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Analysis failed')
    } finally {
      setAnalyzing(false)
    }
  }

  const getRiskLevel = (score) => {
    if (score >= 0.7) return { level: 'High', class: 'risk-high' }
    if (score >= 0.4) return { level: 'Medium', class: 'risk-medium' }
    return { level: 'Low', class: 'risk-low' }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Analyze Your Code
        </h1>
        <p className="text-lg text-gray-600">
          Upload a Python file or provide a GitHub repository URL to get started
        </p>
      </motion.div>

      {!result ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Input Section */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === 'upload'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Upload Code
              </button>
              <button
                onClick={() => setActiveTab('repo')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === 'repo'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Repository URL
              </button>
            </div>

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors duration-200">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-primary-600 font-medium hover:text-primary-500">
                      Upload a Python file
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".py"
                      onChange={handleFileUpload}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">or paste your code below</p>
                </div>

                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your Python code here..."
                  className="w-full h-64 input-field font-mono text-sm"
                />
              </motion.div>
            )}

            {/* Repository Tab */}
            {activeTab === 'repo' && (
              <motion.div
                key="repo"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Link className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <label htmlFor="repo-url" className="block">
                    <span className="text-gray-700 font-medium">GitHub Repository URL</span>
                    <input
                      id="repo-url"
                      type="url"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      placeholder="https://github.com/username/repository"
                      className="mt-2 w-full input-field"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    We'll analyze the main Python files in the repository
                  </p>
                </div>
              </motion.div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {analyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Code
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Code2 className="w-5 h-5 mr-2 text-primary-600" />
                What We Analyze
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Code complexity and structure
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Potential bug risks and vulnerabilities
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Code quality metrics
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Maintainability and readability
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                Risk Factors
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="font-medium text-red-800">High Risk</span>
                  </div>
                  <p className="text-xs text-red-600">Complex code with multiple issues</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="font-medium text-yellow-800">Medium Risk</span>
                  </div>
                  <p className="text-xs text-yellow-600">Some areas need improvement</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium text-green-800">Low Risk</span>
                  </div>
                  <p className="text-xs text-green-600">Good code quality</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Results Section */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h2>
            
            {/* Overall Risk Score */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Risk Score</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full transition-all duration-500 ${
                        result.overall_risk_score >= 0.7 ? 'bg-red-500' :
                        result.overall_risk_score >= 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${result.overall_risk_score * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskLevel(result.overall_risk_score).class}`}>
                    {getRiskLevel(result.overall_risk_score).level} Risk
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {(result.overall_risk_score * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>

            {/* File Analyses */}
            {result.file_analyses && result.file_analyses.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">File Analysis</h3>
                <div className="space-y-4">
                  {result.file_analyses.map((file, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{file.file_name}</h4>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevel(file.risk_score).class}`}>
                          {(file.risk_score * 100).toFixed(1)}% Risk
                        </div>
                      </div>
                      
                      {file.features && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Lines of Code:</span>
                            <span className="ml-2 font-medium">{file.features.loc}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Functions:</span>
                            <span className="ml-2 font-medium">{file.features.num_functions}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Complexity:</span>
                            <span className="ml-2 font-medium">{file.features.cyclomatic_complexity.toFixed(1)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Nesting Depth:</span>
                            <span className="ml-2 font-medium">{file.features.nesting_depth}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Features */}
            {result.important_features && result.important_features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Risk Factors</h3>
                <ul className="space-y-2">
                  {result.important_features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setResult(null)
                  setCode('')
                  setRepoUrl('')
                }}
                className="btn-primary"
              >
                Analyze Another File
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Home

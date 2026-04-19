import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { 
  History as HistoryIcon, 
  FileText, 
  Trash2,
  Eye,
  Calendar,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { historyAPI } from '../services/api'
import toast from 'react-hot-toast'

const History = () => {
  const [page, setPage] = useState(1)
  const [selectedAnalysis, setSelectedAnalysis] = useState(null)
  const queryClient = useQueryClient()

  const { data: historyData, isLoading } = useQuery(
    ['history', page],
    () => historyAPI.getHistory({ page, limit: 10 }),
    { keepPreviousData: true }
  )

  const deleteMutation = useMutation(historyAPI.deleteHistory, {
    onSuccess: () => {
      queryClient.invalidateQueries('history')
      toast.success('Analysis deleted successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to delete analysis')
    }
  })

  const { data: analysisDetail, isLoading: detailLoading } = useQuery(
    ['analysis-detail', selectedAnalysis],
    () => historyAPI.getHistoryById(selectedAnalysis),
    {
      enabled: !!selectedAnalysis,
      onSuccess: (data) => {
        // Store the detailed data for display
        setSelectedAnalysis(data.data)
      }
    }
  )

  const handleDelete = (id, e) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this analysis?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleViewDetails = (id) => {
    setSelectedAnalysis(id)
  }

  const closeModal = () => {
    setSelectedAnalysis(null)
  }

  const getRiskLevel = (score) => {
    if (score >= 0.7) return { level: 'High', class: 'risk-high' }
    if (score >= 0.4) return { level: 'Medium', class: 'risk-medium' }
    return { level: 'Low', class: 'risk-low' }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const analyses = historyData?.data?.histories || []
  const pagination = historyData?.data?.pagination || {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
        <p className="text-gray-600 mt-2">View and manage your previous code analyses</p>
      </div>

      {analyses.length > 0 ? (
        <div className="space-y-4">
          {analyses.map((analysis, index) => (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => handleViewDetails(analysis.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{analysis.file_name}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(analysis.created_at)}
                      </span>
                      {analysis.repo_url && (
                        <span className="flex items-center">
                          <HistoryIcon className="w-4 h-4 mr-1" />
                          Repository
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevel(analysis.risk_score).class}`}>
                    {getRiskLevel(analysis.risk_score).level} Risk
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {(analysis.risk_score * 100).toFixed(1)}%
                  </div>
                  <button
                    onClick={(e) => handleDelete(analysis.id, e)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                    title="Delete analysis"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {page} of {pagination.pages}
              </span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page >= pagination.pages}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card text-center py-12"
        >
          <HistoryIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis History</h3>
          <p className="text-gray-500 mb-6">
            You haven't analyzed any code yet. Start by uploading a Python file or providing a repository URL.
          </p>
          <a
            href="/home"
            className="btn-primary inline-flex items-center"
          >
            <FileText className="w-5 h-5 mr-2" />
            Analyze Code
          </a>
        </motion.div>
      )}

      {/* Detail Modal */}
      {selectedAnalysis && typeof selectedAnalysis === 'string' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Analysis Details</h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {detailLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : analysisDetail?.data ? (
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">File Name:</span>
                        <span className="ml-2 font-medium">{analysisDetail.data.file_name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Risk Score:</span>
                        <span className="ml-2 font-medium">{(analysisDetail.data.risk_score * 100).toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Analyzed:</span>
                        <span className="ml-2 font-medium">{formatDate(analysisDetail.data.created_at)}</span>
                      </div>
                      {analysisDetail.data.repo_url && (
                        <div>
                          <span className="text-gray-500">Repository:</span>
                          <a 
                            href={analysisDetail.data.repo_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-2 font-medium text-primary-600 hover:underline"
                          >
                            View Repository
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Analysis Results */}
                  {analysisDetail.data.result_json && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Analysis Results</h3>
                      
                      {/* Overall Risk */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2">Overall Risk Score</h4>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <div className="bg-gray-200 rounded-full h-3">
                              <div 
                                className={`h-3 rounded-full ${
                                  analysisDetail.data.result_json.overall_risk_score >= 0.7 ? 'bg-red-500' :
                                  analysisDetail.data.result_json.overall_risk_score >= 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${analysisDetail.data.result_json.overall_risk_score * 100}%` }}
                              />
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevel(analysisDetail.data.result_json.overall_risk_score).class}`}>
                            {getRiskLevel(analysisDetail.data.result_json.overall_risk_score).level}
                          </span>
                        </div>
                      </div>

                      {/* Important Features */}
                      {analysisDetail.data.result_json.important_features && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-700 mb-2">Key Risk Factors</h4>
                          <ul className="space-y-1">
                            {analysisDetail.data.result_json.important_features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-600">
                                <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Recommendations */}
                      {analysisDetail.data.result_json.recommendations && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Recommendations</h4>
                          <ul className="space-y-1">
                            {analysisDetail.data.result_json.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Unable to load analysis details
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default History

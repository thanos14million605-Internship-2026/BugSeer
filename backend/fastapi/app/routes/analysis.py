from fastapi import APIRouter, HTTPException
from app.schemas.analysis import AnalysisRequest, AnalysisResponse, FileAnalysis, FeatureExtraction
from app.services.ml_service import MLService
import requests
import os
from typing import List

router = APIRouter()
ml_service = MLService()

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_code(request: AnalysisRequest):
    """Analyze code for bug risk prediction using trained Random Forest model."""
    try:
        if not request.code and not request.repo_url:
            raise HTTPException(status_code=400, detail="Either code or repo_url must be provided")
        
        file_analyses = []
        
        if request.code:
            # Analyze single file code
            result = ml_service.predict_risk(request.code, "uploaded_file.py")
            
            feature_extraction = FeatureExtraction(**result['features'])
            file_analysis = FileAnalysis(
                file_name="uploaded_file.py",
                risk_score=result['risk_score'],
                features=feature_extraction,
                high_risk_functions=result.get('high_risk_functions', [])
            )
            file_analyses.append(file_analysis)
        
        elif request.repo_url:
            # TODO: Implement GitHub repository analysis
            # For now, return a placeholder
            raise HTTPException(status_code=501, detail="Repository analysis not yet implemented")
        
        # Calculate overall risk score
        overall_risk_score = sum(analysis.risk_score for analysis in file_analyses) / len(file_analyses)
        
        # Get important features and recommendations from the model result
        result = ml_service.predict_risk(request.code or "", "uploaded_file.py")
        important_features = result.get('important_features', [])
        recommendations = result.get('recommendations', [])
        
        return AnalysisResponse(
            overall_risk_score=overall_risk_score,
            file_analyses=file_analyses,
            important_features=important_features,
            recommendations=recommendations
        )
        
    except ValueError as e:
        # Handle model-specific errors
        if "Model not loaded" in str(e):
            raise HTTPException(
                status_code=503, 
                detail="ML model not available. Please train the model first using train_model.py"
            )
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.get("/analyze/health")
async def analysis_health():
    """Health check for analysis endpoint."""
    model_info = ml_service.get_model_info()
    return {
        "status": "healthy", 
        "service": "Code Analysis API",
        "model": model_info
    }

@router.get("/model/info")
async def get_model_info():
    """Get information about the loaded ML model."""
    return ml_service.get_model_info()

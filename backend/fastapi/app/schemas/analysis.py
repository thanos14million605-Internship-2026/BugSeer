from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class AnalysisRequest(BaseModel):
    code: Optional[str] = None
    repo_url: Optional[str] = None
    
    class Config:
        schema_extra = {
            "example": {
                "code": "def example_function():\n    return 'Hello World'"
            }
        }

class FeatureExtraction(BaseModel):
    loc: int
    num_functions: int
    cyclomatic_complexity: float
    nesting_depth: int
    num_imports: int
    num_classes: int
    avg_function_length: float

class FileAnalysis(BaseModel):
    file_name: str
    risk_score: float
    features: FeatureExtraction
    high_risk_functions: List[str]

class AnalysisResponse(BaseModel):
    overall_risk_score: float
    file_analyses: List[FileAnalysis]
    important_features: List[str]
    recommendations: List[str]
    
    class Config:
        schema_extra = {
            "example": {
                "overall_risk_score": 0.75,
                "file_analyses": [
                    {
                        "file_name": "example.py",
                        "risk_score": 0.8,
                        "features": {
                            "loc": 150,
                            "num_functions": 5,
                            "cyclomatic_complexity": 12.5,
                            "nesting_depth": 4,
                            "num_imports": 8,
                            "num_classes": 2,
                            "avg_function_length": 30.0
                        },
                        "high_risk_functions": ["complex_function", "nested_handler"]
                    }
                ],
                "important_features": ["cyclomatic_complexity", "nesting_depth"],
                "recommendations": ["Reduce function complexity", "Add error handling"]
            }
        }

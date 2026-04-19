import ast
import re
from typing import Dict, List, Any
import pandas as pd

class CodeFeatureExtractor:
    def __init__(self):
        self.features = {}
    
    def extract_features(self, code: str, file_name: str = "unknown.py") -> Dict[str, Any]:
        """Extract features from Python code for ML prediction."""
        try:
            tree = ast.parse(code)
        except SyntaxError:
            # Handle syntax errors gracefully
            return self._get_default_features()
        
        features = {
            'loc': self._count_lines(code),
            'num_functions': self._count_functions(tree),
            'cyclomatic_complexity': self._calculate_cyclomatic_complexity(tree),
            'nesting_depth': self._calculate_nesting_depth(tree),
            'num_imports': self._count_imports(tree),
            'num_classes': self._count_classes(tree),
            'avg_function_length': self._calculate_avg_function_length(tree, code)
        }
        
        return features
    
    def _count_lines(self, code: str) -> int:
        """Count lines of code (excluding empty lines and comments)."""
        lines = code.split('\n')
        non_empty_lines = [line for line in lines if line.strip() and not line.strip().startswith('#')]
        return len(non_empty_lines)
    
    def _count_functions(self, tree: ast.AST) -> int:
        """Count number of function definitions."""
        functions = []
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                functions.append(node)
        return len(functions)
    
    def _count_classes(self, tree: ast.AST) -> int:
        """Count number of class definitions."""
        classes = []
        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef):
                classes.append(node)
        return len(classes)
    
    def _count_imports(self, tree: ast.AST) -> int:
        """Count number of import statements."""
        imports = []
        for node in ast.walk(tree):
            if isinstance(node, (ast.Import, ast.ImportFrom)):
                imports.append(node)
        return len(imports)
    
    def _calculate_cyclomatic_complexity(self, tree: ast.AST) -> float:
        """Calculate cyclomatic complexity."""
        complexity = 1  # Base complexity
        
        for node in ast.walk(tree):
            if isinstance(node, (ast.If, ast.While, ast.For, ast.With)):
                complexity += 1
            elif isinstance(node, ast.ExceptHandler):
                complexity += 1
            elif isinstance(node, ast.BoolOp):
                complexity += len(node.values) - 1
        
        return float(complexity)
    
    def _calculate_nesting_depth(self, tree: ast.AST) -> int:
        """Calculate maximum nesting depth."""
        max_depth = 0
        
        def get_depth(node, current_depth=0):
            nonlocal max_depth
            max_depth = max(max_depth, current_depth)
            
            for child in ast.iter_child_nodes(node):
                if isinstance(child, (ast.If, ast.While, ast.For, ast.With, ast.Try)):
                    get_depth(child, current_depth + 1)
                else:
                    get_depth(child, current_depth)
        
        get_depth(tree)
        return max_depth
    
    def _calculate_avg_function_length(self, tree: ast.AST, code: str) -> float:
        """Calculate average function length in lines."""
        functions = []
        lines = code.split('\n')
        
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                start_line = node.lineno - 1
                end_line = node.end_lineno if hasattr(node, 'end_lineno') else len(lines)
                func_length = end_line - start_line
                functions.append(func_length)
        
        if not functions:
            return 0.0
        
        return sum(functions) / len(functions)
    
    def _get_default_features(self) -> Dict[str, Any]:
        """Return default features for code that can't be parsed."""
        return {
            'loc': 0,
            'num_functions': 0,
            'cyclomatic_complexity': 1.0,
            'nesting_depth': 0,
            'num_imports': 0,
            'num_classes': 0,
            'avg_function_length': 0.0
        }

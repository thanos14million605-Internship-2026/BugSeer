const { pool } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class History {
  static async create(historyData) {
    const { user_id, file_name, repo_url, risk_score, result_json } = historyData;
    const id = uuidv4();
    
    const query = `
      INSERT INTO histories (id, user_id, file_name, repo_url, risk_score, result_json, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      id, user_id, file_name, repo_url, risk_score, JSON.stringify(result_json)
    ]);
    
    return result.rows[0];
  }
  
  static async findByUserId(user_id, limit = 10, offset = 0) {
    const query = `
      SELECT * FROM histories 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3
    `;
    
    const result = await pool.query(query, [user_id, limit, offset]);
    return result.rows;
  }
  
  static async findById(id) {
    const query = 'SELECT * FROM histories WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
  
  static async delete(id, user_id) {
    const query = 'DELETE FROM histories WHERE id = $1 AND user_id = $2 RETURNING *';
    const result = await pool.query(query, [id, user_id]);
    return result.rows[0];
  }
  
  static async getUserStats(user_id) {
    const query = `
      SELECT 
        COUNT(*) as total_analyses,
        AVG(risk_score) as avg_risk_score,
        MAX(risk_score) as max_risk_score,
        MIN(risk_score) as min_risk_score
      FROM histories 
      WHERE user_id = $1
    `;
    
    const result = await pool.query(query, [user_id]);
    return result.rows[0];
  }
}

module.exports = History;

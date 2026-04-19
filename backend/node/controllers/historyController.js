const History = require('../models/History');

const getHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const histories = await History.findByUserId(req.user.id, limit, offset);
    const stats = await History.getUserStats(req.user.id);

    res.json({
      histories,
      stats,
      pagination: {
        page,
        limit,
        total: histories.length
      }
    });
  } catch (error) {
    console.error('History Error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

const getHistoryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const history = await History.findById(id);
    
    if (!history) {
      return res.status(404).json({ error: 'History entry not found' });
    }
    
    if (history.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ history });
  } catch (error) {
    console.error('History Detail Error:', error);
    res.status(500).json({ error: 'Failed to fetch history details' });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedHistory = await History.delete(id, req.user.id);
    
    if (!deletedHistory) {
      return res.status(404).json({ error: 'History entry not found' });
    }

    res.json({ message: 'History entry deleted successfully' });
  } catch (error) {
    console.error('Delete History Error:', error);
    res.status(500).json({ error: 'Failed to delete history entry' });
  }
};

module.exports = {
  getHistory,
  getHistoryById,
  deleteHistory
};

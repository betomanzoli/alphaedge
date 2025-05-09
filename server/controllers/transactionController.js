
// Transaction Controller

// Mock transactions data (in a real implementation, this would come from a database)
const transactions = [
  {
    id: '1',
    timestamp: new Date('2025-05-08T10:30:00'),
    type: 'buy',
    tokenAmount: 5000,
    tokenSymbol: 'opXEN',
    price: 0.00021,
    total: 0.05,
    status: 'completed',
    txHash: '0x12345...'
  },
  {
    id: '2',
    timestamp: new Date('2025-05-08T14:45:00'),
    type: 'buy',
    tokenAmount: 3000,
    tokenSymbol: 'opXEN',
    price: 0.00019,
    total: 0.03,
    status: 'completed',
    txHash: '0x23456...'
  }
];

const getTransactions = (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const results = {
      transactions: transactions.slice(startIndex, endIndex),
      pagination: {
        totalItems: transactions.length,
        currentPage: page,
        totalPages: Math.ceil(transactions.length / limit)
      }
    };
    
    res.status(200).json({
      success: true,
      ...results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get transactions',
      error: error.message
    });
  }
};

const getTransactionById = (req, res) => {
  try {
    const { id } = req.params;
    const transaction = transactions.find(tx => tx.id === id);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    res.status(200).json({
      success: true,
      transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get transaction',
      error: error.message
    });
  }
};

const getMetrics = (req, res) => {
  try {
    // Calculate metrics from transactions
    const totalBought = transactions.filter(tx => tx.type === 'buy')
      .reduce((sum, tx) => sum + tx.tokenAmount, 0);
      
    const totalSpent = transactions.filter(tx => tx.type === 'buy')
      .reduce((sum, tx) => sum + tx.total, 0);
    
    const totalSold = transactions.filter(tx => tx.type === 'sell')
      .reduce((sum, tx) => sum + tx.tokenAmount, 0);
      
    const totalEarned = transactions.filter(tx => tx.type === 'sell')
      .reduce((sum, tx) => sum + tx.total, 0);
    
    const metrics = {
      totalBought,
      totalSpent,
      totalSold,
      totalEarned,
      netTokens: totalBought - totalSold,
      netValue: totalEarned - totalSpent,
      avgBuyPrice: totalBought > 0 ? totalSpent / totalBought : 0,
      avgSellPrice: totalSold > 0 ? totalEarned / totalSold : 0,
      transactionsCount: transactions.length
    };
    
    res.status(200).json({
      success: true,
      metrics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get metrics',
      error: error.message
    });
  }
};

module.exports = {
  getTransactions,
  getTransactionById,
  getMetrics
};

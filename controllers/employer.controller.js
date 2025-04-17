const User = require('../models/user.model');
const Lead = require('../models/lead.model');

const dashboardStats = async (req, res) => {
  const leads = await Lead.find();
  
  const stats = {
    inProgress: leads.filter(lead => lead.status === 'IN_PROGRESS').length,
    completed: leads.filter(lead => lead.status === 'COMPLETED').length,
    canceled: leads.filter(lead => lead.status === 'CANCELED').length,
  };
  
  res.json(stats);
};

const getManagers = async (req, res) => {
  const managers = await User.find({ role: 'manager' });
  res.json(managers);
};

// Autres contrôleurs pour créer, mettre à jour, supprimer des managers et des leads

module.exports = { dashboardStats, getManagers };

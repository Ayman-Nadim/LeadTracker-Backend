const Lead = require('../models/lead.model');

const getAssignedLeads = async (req, res) => {
  const managerId = req.user.userId;
  const leads = await Lead.find({ managerId });

  res.json(leads);
};

const updateLead = async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (lead.managerId.toString() !== req.user.userId) {
    return res.status(403).send("Unauthorized to update this lead");
  }

  lead.status = req.body.status || lead.status;
  lead.notes = req.body.notes || lead.notes;
  
  await lead.save();

  res.json(lead);
};

module.exports = { getAssignedLeads, updateLead };

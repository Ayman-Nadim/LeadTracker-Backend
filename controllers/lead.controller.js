const Lead = require('../models/lead.model');

// Employer APIs
exports.getAllLeads = async (req, res) => {
  const filter = {};
  if (req.query.managerId) filter.managerId = req.query.managerId;
  if (req.query.status) filter.status = req.query.status;

  const leads = await Lead.find(filter).populate('managerId', 'name email');
  res.json(leads);
};

exports.createLead = async (req, res) => {
  const { contactName, contactEmail, companyName, status, managerId } = req.body;
  const lead = new Lead({ contactName, contactEmail, companyName, status, managerId });
  await lead.save();
  res.status(201).json(lead);
};

exports.updateLead = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!lead) return res.status(404).send('Lead not found');
  res.json(lead);
};

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).send({ message: 'Lead not found' });

    res.status(200).json({
      message: 'Lead supprimé avec succès',
      deletedLead: lead,
    });
  } catch (error) {
    res.status(500).send({ message: 'Erreur serveur', error });
  }
};


// Manager APIs
exports.getManagerLeads = async (req, res) => {
  const leads = await Lead.find({ managerId: req.user.userId });
  res.json(leads);
};

exports.updateManagerLead = async (req, res) => {
  const lead = await Lead.findOne({ _id: req.params.id, managerId: req.user.userId });
  if (!lead) return res.status(403).send('Unauthorized or lead not found');

  if (req.body.status) lead.status = req.body.status;
  if (req.body.notes) lead.notes = req.body.notes;

  await lead.save();
  res.json(lead);
};


//GetEmployerDashboardStats
exports.getEmployerDashboardStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();

    const leadsByStatus = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const leadsByManager = await Lead.aggregate([
      {
        $group: {
          _id: "$managerId",
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "manager"
        }
      },
      {
        $unwind: { path: "$manager", preserveNullAndEmptyArrays: true }
      },
      {
        $project: {
          managerName: "$manager.name",
          managerEmail: "$manager.email",
          count: 1
        }
      }
    ]);

    res.json({
      totalLeads,
      leadsByStatus,
      leadsByManager,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

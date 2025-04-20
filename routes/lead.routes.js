const express = require('express');
const router = express.Router();
const leadCtrl = require('../controllers/lead.controller');
const { authenticate, authorize } = require('../middleware/auth');


// Employer routes
router.get('/employer/leads', authenticate, authorize('employer'), leadCtrl.getAllLeads);
router.post('/employer/leads', authenticate, authorize('employer'), leadCtrl.createLead);
router.put('/employer/leads/:id', authenticate, authorize('employer'), leadCtrl.updateLead);
router.delete('/employer/leads/:id', authenticate, authorize('employer'), leadCtrl.deleteLead);

// Manager routes
router.get('/managers/leads', authenticate, authorize('manager'), leadCtrl.getManagerLeads);
router.patch('/managers/leads/:id', authenticate, authorize('manager'), leadCtrl.updateManagerLead); //id of Lead !!

//Dashboard
// router.get('/employer/dashboard-status', authenticate, authorize('employer'), leadCtrl.getEmployerDashboardStats);
router.get('/employer/dashboard-status', authenticate, authorize('employer'), leadCtrl.getEmployerDashboardStats);

module.exports = router;

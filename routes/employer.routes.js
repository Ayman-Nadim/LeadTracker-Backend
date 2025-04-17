const express = require('express');
const router = express.Router();
const { dashboardStats, getManagers } = require('../controllers/employer.controller');
const {authenticate} = require('../middleware/auth');
const { roleGuard } = require('../middleware/role');

// // Protect routes with role-based guard
router.use(authenticate);
router.use(roleGuard('employer'));

router.get('/dashboard-stats', dashboardStats);
router.get('/managers', getManagers);

// Autres routes pour gérer les managers et les leads

module.exports = router;

const express = require('express');
const router = express.Router();
const { getAssignedLeads, updateLead } = require('../controllers/manager.controller');
const {authenticate} = require('../middleware/auth');
const {roleGuard} = require('../middleware/role');

router.use(authenticate);
router.use(roleGuard('manager'));

router.get('/leads', getAssignedLeads);
router.patch('/leads/:id', updateLead);

module.exports = router;

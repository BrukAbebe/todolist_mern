const express = require('express');
const router = express.Router();
const upload = require('../config/multer'); 
const taskController = require('../controllers/taskController');


const uploadMultiple = upload.array('attachments');
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', uploadMultiple, taskController.createTask);
router.put('/:id', uploadMultiple, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;

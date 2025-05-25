var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { stringify } = require('jade/lib/utils');

// Get All tasks
router.get('/get-all', async function (req, res) {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

router.get('/detail/:id', async function (req, res) {
    const { id } = req.params;

  const tasks = await prisma.task.findUnique({
    where:{
      id: parseInt(id),
    }
  });
  res.json(tasks);
});

// Create task
router.post('/create', async function (req, res) {
  const { title, desc, priority, deadline, status, created_by, created_at, updated_by, updated_at } = req.body;
  const task = await prisma.task.create({
    data: {
        title: title,
        desc: desc,
        priority: priority,
        deadline: deadline,
        status: status,
        created_by: created_by,
        created_at: created_at,
        updated_by: updated_by,
        updated_at: updated_at
    },
  });
  res.send(task);
});

// Update task
router.put('/update/:id', async function (req, res) {
  const { id } = req.params;
  const { title, desc, priority, deadline, status, created_by, created_at, updated_by, updated_at } = req.body;
  const task = await prisma.task.update({
    where: {
      id: parseInt(id),
    },
    data: {
        title: title,
        desc: desc,
        priority: priority,
        deadline: deadline,
        status: status,
        created_by: created_by,
        created_at: created_at,
        updated_by: updated_by,
        updated_at: updated_at
    },
  });
  res.send(task);
});

// Delete task
router.delete('/delete/:id', async function (req, res) {
  const { id } = req.params;
  const task = await prisma.task.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(task);
});

module.exports = router;

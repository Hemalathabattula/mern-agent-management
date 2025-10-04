const csv = require('csv-parser');
const fs = require('fs');
const Agent = require('../models/Agent');
const List = require('../models/List');
const xlsx = require('xlsx');

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
};

const parseXLSX = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet);
};

exports.uploadAndDistribute = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const fileExt = req.file.originalname.split('.').pop().toLowerCase();

  let data;
  try {
    if (fileExt === 'csv') {
      data = await parseCSV(filePath);
    } else if (fileExt === 'xlsx' || fileExt === 'xls') {
      data = parseXLSX(filePath);
    } else {
      return res.status(400).json({ message: 'Invalid file type. Only CSV, XLSX, XLS allowed.' });
    }

    // Validate data
    if (!data.length) {
      return res.status(400).json({ message: 'File is empty' });
    }

    const requiredFields = ['FirstName', 'Phone', 'Notes'];
    const firstRow = data[0];
    for (const field of requiredFields) {
      if (!(field in firstRow)) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    // Get all agents
    const agents = await Agent.find();
    if (agents.length !== 5) {
      return res.status(400).json({ message: 'There must be exactly 5 agents to distribute the list.' });
    }

    // Distribute items equally
    const numItems = data.length;
    const itemsPerAgent = Math.floor(numItems / 5);
    const remainder = numItems % 5;

    const distributedLists = [];
    let index = 0;

    for (let i = 0; i < 5; i++) {
      const agentItems = [];
      const count = itemsPerAgent + (i < remainder ? 1 : 0);
      for (let j = 0; j < count; j++) {
        const item = data[index++];
        agentItems.push({
          firstName: item.FirstName,
          phone: item.Phone,
          notes: item.Notes || '',
        });
      }

      const list = new List({
        agent: agents[i]._id,
        items: agentItems,
      });

      await list.save();
      distributedLists.push({
        agent: agents[i].name,
        items: agentItems,
      });
    }

    // Remove the uploaded file
    fs.unlinkSync(filePath);

    res.json({ message: 'List distributed successfully', distributedLists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLists = async (req, res) => {
  try {
    const lists = await List.find().populate('agent', 'name email');
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const Agent = require('../models/Agent');

exports.createAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: 'Agent with this email already exists' });
    }

    const agent = new Agent({
      name,
      email,
      mobile,
      password,
    });

    await agent.save();

    res.status(201).json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      mobile: agent.mobile,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select('-password');
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

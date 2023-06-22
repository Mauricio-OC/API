const { login } = require('../services');

const handleLogin = async (req, res) => {
  const { type, message } = await login(req.body);
  if (type) {
    return res.status(type).json({ message });
  } 
    return res.status(200).json({ token: message });
};

module.exports = {
  handleLogin,
};

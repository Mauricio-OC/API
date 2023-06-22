const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        message: '"email" must be a valid email',
      });
    }
    next();
  };

  module.exports = validateEmail;
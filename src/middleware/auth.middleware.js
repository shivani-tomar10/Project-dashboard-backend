module.exports = (req, res, next) => {
  // Simulate logged-in user using headers
  req.user = {
    id: 1,
    role: req.headers["role"] || "viewer"
  };

  next();
};
const authMiddleware = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  next();
};

module.exports = authMiddleware;
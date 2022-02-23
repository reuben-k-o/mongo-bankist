exports.getIndex = (req, res, next) => {
  res.render('index', {
    path: '/',
    isAuthenticated: true,
  });
};

exports.getMovements = (req, res, next) => {};
exports.postMovements = (req, res, next) => {};

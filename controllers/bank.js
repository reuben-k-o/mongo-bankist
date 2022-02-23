exports.getIndex = (req, res, next) => {
  res.render('index', {
    path: '/',
    isAuthenticated: false,
  });
};

exports.getMovements = (req, res, next) => {};
exports.postMovements = (req, res, next) => {};

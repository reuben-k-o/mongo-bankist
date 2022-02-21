exports.getIndex = (req, res, next) => {
  res.render('index', {
    path: '/',
  });
};

exports.getLogin = (req, res, next) => {};
exports.postLogin = (req, res, next) => {};

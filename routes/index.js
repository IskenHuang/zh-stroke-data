
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Cheese'});
};

exports.top100 = function(req, res) {
  res.render('top100', { title : 'Cheese'});
};

exports.exam = function(req, res) {
  res.render('exam', { title : 'Cheese'});
};

exports.numbers = function(req, res) {
  res.render('numbers', { title : 'Cheese'});
};

exports.thanks = function(req, res) {
  res.render('thanks', { title : 'Cheese'});
};

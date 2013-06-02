
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.top100 = function(req, res) {
  res.render('top100', { title : 'Express'});
};

exports.exam = function(req, res) {
  res.render('exam', { title : 'Express'});
};

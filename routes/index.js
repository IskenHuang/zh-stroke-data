
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.top100 = function() {
  res.render('top100', { title : 'Express'});
};

exports.exam = function() {
  res.render('exam', { title : 'Express'});
};

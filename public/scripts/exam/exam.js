// Generated by CoffeeScript 1.6.2
(function() {
  var Exam;

  Exam = (function() {
    function Exam() {}

    Exam.prototype.fetch = function(id, cb) {
      return $.get("data/exam/" + id + ".json", cb);
    };

    window.Exam = Exam;

  })();

}).call(this);
$(function() {
    var exam = new Exam;
    exam.fetch("1", function(data) {
        console.log(data);
    });
});

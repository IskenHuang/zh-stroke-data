$(function() {

    var exam = new Exam,
        examId = 1 + Math.floor( Math.random() * 1000 ) % exam.getExamCount();

    // random out the exam id first

    exam.fetch( examId , function(examData) {
        // examData.title
        // examData.content
    });
});

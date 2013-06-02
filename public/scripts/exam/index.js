$(function() {

    var exam = new Exam,
        examId = 1 + Math.floor( Math.random() * 1000 ) % exam.getExamCount();

    // random out the exam id first

    exam.fetch( examId , function(examData) {

        $(".submit-exam").removeAttr("disabled");

        // examData.title
        // examData.content
    });

    $(".submit-exam").on("click", function() {

        var ans = $(".user-input").val();

        if ( exam.checkAnswer(ans)) {
            alert('y');
        }
        else {
            alert('x');
        }
    });
});

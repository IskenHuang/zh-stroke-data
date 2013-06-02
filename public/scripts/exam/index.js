$(function() {

    var exam = new Exam,
        examId = 1 + Math.floor( Math.random() * 1000 ) % exam.getExamCount();

    // show this wrapper
    $(".exam_wrapper").removeClass("hide");


    exam.fetch( examId , function(examData) {
        $(".exam_block").html( examData.content );
        $(".submit-exam").removeAttr("disabled");
    });

    $(".submit-exam").on("click", function() {

        var ans = $(".user-input").val();

        if ( exam.checkAnswer(ans)) {
            alert('答對了 xDD');
        }
        else {
            alert('Wrong Answer !!!!');
        }
    });
});

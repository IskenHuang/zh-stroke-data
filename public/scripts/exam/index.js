$(function() {

    var exam = new Exam,
        examId = 1 + Math.floor( Math.random() * 1000 ) % exam.getExamCount();

    // show this wrapper
    $(".exam_wrapper, .exam_block").removeClass("hide");
    $(".user-input-submit").hide();

    exam.fetch( examId , function(examData) {
        $(".exam_block").html( examData.content );
        $(".submit-exam").removeAttr("disabled");
    });

    $(".submit-exam").on("click", function() {

        var ans = $(".user-input").val();

        if ( exam.checkAnswer(ans)) {
            $.growlUI('答對了!!!');
        }
        else {
            $.growlUI('答錯了.... orz');
        }
    });
});

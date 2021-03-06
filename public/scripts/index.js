$(function() {
    var draw = new DrawChinese();

    $('.top100_block').append($('#template-top100-holder').html());

    $(".user-input-submit").on("click", submitWording);

    $(".show_intro_modal").removeClass("hide");
    $(".show_intro_modal").on("click", function() {
        $('#explan_modal').modal("show");
    });

    function emptyAndDraw( wording ) {
        // empty & draw
        $('#holder').empty();
        draw.strokeWord( wording );
    }

    function submitWording() {
        
        var originalWording = $(".user-input").val(),
    	    encodedWording = encodeURIComponent( originalWording );

        if ( originalWording === "" ) {
            $.growlUI("請輸入文字");
            return;
        }
        else {
            emptyAndDraw( originalWording );
	        $.ajax({
                
                url: "https://www.moedict.tw/a/" + encodedWording + ".json" ,
                // url: "https://www.moedict.tw/raw/" + encodedWording,
	            type: "GET",
	            dataType: "json",
	            async: true,
	            error: function(jqXHR,b,c){
	            },
	            success: function(data){

                    var noun = data.h[0].d[0].f;
                    var kk = data.h[0].p;
                    var english = data.translation.English[0];

                    $("#explan_modal").find(".noun").text(noun)

                    .end()

                    .find(".kk").text(kk)

                    .end()

                    .find(".english").text(english);
		        }
            });
        }
    }


});

$(function() {
    var draw = new DrawChinese();

    $('.top100_block').append($('#template-top100-holder').html());

    $(".user-input-submit").on("click", submitWording);

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

                    console.log(data.h[0]);

                    var noun = data.h[0].d[0].f;
                    var verb = data.h[0].d[1].f;
                    var kk = data.h[0].p;
                    var english = data.translation.English[0];

                    $('#explan_modal').modal("show");

                    $("#explan_modal").find(".noun").text(noun)

                    .end()

                    .find(".verb").text(verb)

                    .end()

                    .find(".kk").text(kk)

                    .end()

                    .find(".english").text(english);
		        }
            });
        }
    }


});

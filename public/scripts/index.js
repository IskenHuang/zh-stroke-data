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
                url: "https://www.moedict.tw/raw/" + encodedWording,
	            type: "GET",
	            dataType: "json",
	            async: true,
	            error: function(jqXHR,b,c){
	            },
	            success: function(data){
	            	console.log(data);
		        }
            });
        }
    }
});

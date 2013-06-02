$(function() {
    var bumblerSpeech = new BumblerSpeech(),
    	draw = new DrawChinese();

    $('.top100_block').append($('#template-top100-holder').html());
    $('.demo_wrapper > .container').prepend($('#template-number-buttons').html());

    $('.btn').click(function(e){
    	talkAndDraw($(e.currentTarget).text());
    });

    $('.user-input').change(function(e) {
    	talkAndDraw($(this).val());
      	// var word, num;

      	// $('#holder').empty();

      	// word = $(this).val();
      	// draw.strokeWord(word);

      	// setTimeout(function(){
      	// 	num = bumblerSpeech.chineseNumberToNumber(word);
	      // 	num = num.replace(/d/ig, '');
	      // 	bumblerSpeech.numberQueue = [ num, 'thank'];
	      // 	bumblerSpeech.play();

	      // 	$('.user-input').val('');

      	// }, 400);
    });

    $('.user-input').blur(function() {
  		$('.user-input').val('');
	});

	var talkAndDraw = function(word){
		$('#holder').empty();
      	draw.strokeWord(word);

      	setTimeout(function(){
      		num = bumblerSpeech.chineseNumberToNumber(word);
	      	num = num.replace(/d/ig, '');
	      	bumblerSpeech.numberQueue = [ num, 'thank'];
	      	bumblerSpeech.play();

	      	$('.user-input').val('');

      	}, 400);
	};
});

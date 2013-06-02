$(function(){
    var draw = new DrawChinese(),
        tts = new TextToSpeach();
    $('.top100_block').append($('#template-top100-holder').html());

    draw.strokeWord('永');
    tts.gcinSpeach('ㄩㄥ3');

    $.getJSON('../data/top100/top100.json', function(data) {
        $.each(data, function(key, val) {
            // load template and replace key
            var template = $('#template-top100-grid-row').html();
            template = template.replace(/##TEXT##/, val.zh);
            template = template.replace(/##UNI##/, val.uni);

            // append html
            $('#top100-grid').append(template);
        });

        $('.grid-row').click(function(e){
            $('#holder').empty();
            $('body').animate({ scrollTop: 0 }, "fast");
            draw.strokeWord( $(e.currentTarget).text() );

            // tts.gcinSpeach('ㄩㄥ3');

            getKey($(e.currentTarget).text());
        });
    });

    var getKey = function(word){
        console.log('word = ', word);
        $.getJSON('https://www.moedict.tw/a/'+word+'.json', function(data) {
            console.log('data.h[0].b = ', data.h[0].b, word);
            tts.gcinSpeach(replaceString(data.h[0].b));
        });
    };

    var replaceString = function(word){
        word = word.replace('ˊ', '2');
        word = word.replace('ˇ', '3');
        word = word.replace('ˋ', '4');

        return word;
    };
});

$(function(){
    var draw = new DrawChinese();
    draw.strokeWord('永');

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
        });
    });
});
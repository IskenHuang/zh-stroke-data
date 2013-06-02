$ ->
    draw = new DrawChinese
    bumbler = new BumblerSpeech('#ma-speech')

    # default to draw
    draw.strokeWord($('#word').val())
    setTimeout(->
        bumbler.digitplay()
    , 2000)

    $('#word').change (e) ->
        $('#holder').empty()
        word = $(this).val()
        draw.strokeWords(word)
        bumbler.digitplay()

    if location.hash
        w = decodeURI location.hash.replace /^#/, ""
        $('#word').val(w) if w
        draw.strokeWords($('#word').val())
        bumbler.digitplay()

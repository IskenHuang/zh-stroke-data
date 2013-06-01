class BumblerSpeech
    constructor: (options = {}) ->
        if typeof options is "string"
            @player = document.querySelector(options)
            @numberQueue = []
            @playing = false
        else
            mergedOptions = $.extend({}, @defaultOptions, options)
            @player = document.querySelector(mergedOptions.player)
            @numberQueue = mergedOptions.numbers
            @playing = false

        $(@).on 'speechEnd', =>
            @delay 300, =>
                currentNumber = @numberQueue.shift()
                if currentNumber is undefined or null
                    @playing = false
                    return
                @playNumber(currentNumber)

    defaultOptions:
        player: '#ma-speech'
        numbers: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

    delay: (ms, func) -> setTimeout func, ms

    playPartial: (partialIndex, rate = 1.0) ->
        partial = @AUDIO_MAP[partialIndex]
        @player.currentTime = partial.start
        @player.play()

        duration = partial.duration / rate * 1000

        setTimeout( =>
            @player.pause()
        , duration)

    playSequence: (indexQueue, literal = false) ->
        audioEventHandler = =>
            @player.removeEventListener('pause', audioEventHandler)
            queueIterate()

        queueIterate = =>
            currentIndex = indexQueue.shift()
            playbackRate = 0.9
            if currentIndex is undefined or null
                $(@).trigger('speechEnd')
                return false

            if indexQueue.length > 0
                playbackRate = if currentIndex is "d10" then 1.55 else 1.20

            playbackRate = 1 if literal
            @player.addEventListener('pause', audioEventHandler)
            @playPartial(currentIndex, playbackRate)

        queueIterate()

    numberToSpeechQueue: (number) ->
        return ["thank"] if number is "thank"
        return false if number >= 100 or number < 1

        queueArray = []
        digit1 = number % 10
        digit10 = (number - digit1) / 10

        if digit10 > 0
            queueArray.push "d#{digit10}" if digit10 > 1
            queueArray.push "d10"

        queueArray.push "d#{digit1}" if digit1 > 0

        queueArray

    playNumber: (number) ->
        speechQueue = @numberToSpeechQueue(number)
        @playSequence(speechQueue)

    play: ->
        $(@).trigger('speechEnd') if !@playing
        @playing = true

    inputElement: '#word'

    checkInput: ->
        numberToPlay = $(@inputElement).val()
        numberToPlay = @chineseNumberToNumber(numberToPlay);
        numberToPlay = numberToPlay.match(/\d+/)

        if numberToPlay? and 0 < numberToPlay < 100
            return numberToPlay
        else
            $(@inputElement).val('').focus()
            return false

    chineseNumberToNumber: (word) ->
        # 1 = 4E00
        # 2 = 4E8C
        # 3 = 4E09
        # 4 = 56DB
        # 5 = 4E94
        # 6 = 516D
        # 7 = 4E03
        # 8 = 516B
        # 9 = 4E5D
        utf8code = escape(word)
                .replace(/%u/g , "")
                .replace(/4E5D/ig, 9)
                .replace(/516B/ig, 8)
                .replace(/4E03/ig, 7)
                .replace(/516D/ig, 6)
                .replace(/4E94/ig, 5)
                .replace(/56DB/ig, 4)
                .replace(/4E09/ig, 3)
                .replace(/4E8C/ig, 2)
                .replace(/4E00/ig, 1)
        return utf8code

    digitplay: ->
        word = $(@inputElement).val()
        word = @chineseNumberToNumber(word)

        if word.match(/0/)
            alert 'can not input "zero"'

        wordRegex = word.match(/^[1-9]+$/)
        if wordRegex
            seq = wordRegex[0].replace(/([\d])/g, ",d$1").split(",")
            seq.splice(0, 1)
            @playSequence(seq, true)

    AUDIO_MAP:
        d1:
            start: 0.45
            duration: 0.5
        d2:
            start: 1.43
            duration: 0.5
        d3:
            start: 2.65
            duration: 0.5
        d4:
            start: 3.55
            duration: 0.5
        d5:
            start: 4.9
            duration: 0.6
        d6:
            start: 5.9
            duration: 0.6
        d7:
            start: 6.7
            duration: 0.55
        d8:
            start: 7.75
            duration: 0.5
        d9:
            start: 8.77
            duration: 0.53
        d10:
            start: 9.52
            duration: 0.53
        thank:
            start: 10.73
            duration: 1.55

class DrawChinese
    constructor: (options = {}) ->

    filterNodes: (childNodes) ->
        nodes = []
        for n in childNodes
            nodes.push n if n.nodeType == 1
        return nodes

    strokeOutline: (paper, outline, pathAttrs) ->
        path = []
        for node in outline.childNodes
            continue if node.nodeType != 1
            a = node.attributes
            continue unless a
            switch node.nodeName
                when "MoveTo"
                    path.push [ "M", parseFloat(a.x.value) , parseFloat(a.y.value) ]
                when "LineTo"
                    path.push [ "L", parseFloat(a.x.value) , parseFloat(a.y.value) ]
                when "QuadTo"
                    path.push [ "Q", parseFloat(a.x1.value) , parseFloat(a.y1.value), parseFloat(a.x2.value), parseFloat(a.y2.value) ]
        outlineElement = paper.path(path).attr(pathAttrs).transform("s0.2,0.2,0,0")
        # outlineElement.hover (-> this.transform("s0.3") ), (-> this.transform("s0.2") )
        return outlineElement

    fetchStrokeXml: (code, cb) -> $.get "../utf8/" + code.toLowerCase() + ".xml", cb, "xml"

    strokeWord: (word, cb) ->
        utf8code = escape(word).replace(/%u/ , "")
        @fetchStrokeXml utf8code, (doc) =>
            outlines = doc.getElementsByTagName 'Outline'

            paper = Raphael("holder", 430, 430)
            # color = "hsb(.8, .75, .75)"
            Raphael.getColor() # skip 1st color
            Raphael.getColor() # skip 2second color
            color = Raphael.getColor()
            pathAttrs = { stroke: color, "stroke-width": 5, "stroke-linecap": "round", "fill": color, "opacity": 0.5 }
            timeoutSeconds = 0
            delay = 800
            for outline in outlines
                do (outline) =>
                    setTimeout (=>
                        outline = @strokeOutline(paper, outline, pathAttrs)
                        outline.animate({ "opacity": 1 }, delay)
                    ), timeoutSeconds += delay

    strokeWords: (words) -> @strokeWord(a) for a in words.split(//).reverse()

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

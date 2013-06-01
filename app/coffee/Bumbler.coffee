class BumblerSpeech
    constructor: (options = {}) ->
        if typeof options is "string"
            @player = document.querySelector(options)
            @numberQueue = []
            @playing = false
        else
            defaultOptions:
                player: '#ma-speech'
                numbers: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

            mergedOptions = $.extend({}, defaultOptions, options)
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
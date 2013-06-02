class TextToSpeach
	constructor: (options = {}) ->

	gogoleSpeach: (text)->
		@appendAudioPlayer('https://translate.google.com/translate_tts?ie=UTF-8&q='+ encodeURIComponent(text)+'&tl=zh-TW')
		document.querySelector('#text-to-speech').play()

	gcinSpeach: (text)->
		@removeAudioPlayer()
		@appendAudioPlayer('http://audreyt.github.io/gcin-voice-data/mp3/'+encodeURIComponent(text)+'/3.mp3')
		document.querySelector('#text-to-speech').play()

	appendAudioPlayer: (url)->
		$('body').append('<audio id="text-to-speech" preload="auto" controls><source src="'+url+'" type="audio/mp3" /></audio>')

	removeAudioPlayer: ->
		$('#text-to-speech').remove()
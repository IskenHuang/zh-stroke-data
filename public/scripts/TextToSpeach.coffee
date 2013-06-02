class TextToSpeach
	constructor: (options = {}) ->

	gogoleSpeach: (text)->
		@appendAudioPlayer('https://translate.google.com/translate_tts?ie=UTF-8&q='+text+'&tl=zh-TW')
		document.querySelector('#text-to-speech').play()

	appendAudioPlayer: (url)->
		$('body').append('<audio id="text-to-speech" preload="auto" controls><source src="'+url+'" type="audio/mp3" /></audio>')

	removeAudioPlayer: ->
		$('#text-to-speech').remove()
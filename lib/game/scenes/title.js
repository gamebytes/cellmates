ig.module('game.scenes.title').
requires(
	'impact.game', 
	'impact.font',
	'plugins.observable',
	'game.scenes.level'
).defines(function() {

	TitleScene = ig.Game.extend({
		font: new ig.Font('media/04b03.font.png'),
		sfx: new ig.Sound('media/audio/jump.*'),

		logo: new ig.Image('media/titleLogo.png'),
		hey: new ig.Image('media/hey.png'),

		init: function() {
			ig.numLives = 5;
		},

		update: function() {
			this.parent();

			if(ig.input.pressed('jump')) {
				var me = this;
				this.sfx.play();
				setTimeout(function() {
					me.fireEvent('scene-complete', 'InstructionsScene');
				}, 5);
			}
		},

		draw: function() {
			this.parent();

			ig.system.context.fillStyle = 'orange';
			ig.system.context.fillRect(0, 0, ig.system.realWidth, ig.system.realHeight);

			this.logo.draw(50, 10);

			this.font.draw("Global Game Jame 2013", ig.system.width / 2, 4, ig.Font.ALIGN.CENTER);

			if(Gamepad.getState(0)) {
				this.hey.draw(4, 150);
				this.font.draw('press (A)', ig.system.width / 2, ig.system.height / 2 + 44, ig.Font.ALIGN.CENTER);
				this.font.draw('(gamepad support is very experimental, it might not work for you,', ig.system.width / 2, ig.system.height / 2 + 70, ig.Font.ALIGN.CENTER);
				this.font.draw('if it doesn\'t, unplug the gamepad for keyboard support)', ig.system.width / 2, ig.system.height / 2 +80, ig.Font.ALIGN.CENTER);
			} else {
				this.font.draw("press 'X' to begin", ig.system.width / 2, ig.system.height / 2 + 44, ig.Font.ALIGN.CENTER);
			}
			
			this.font.draw('Programming and "art": Matt Greer, www.mattgreer.org', 20, ig.system.height - 20);
			this.font.draw("Audio: Ryan Nicholl, www.rnastudios.com", 20, ig.system.height - 10);
		}
	});
});




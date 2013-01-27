ig.module('game.scenes.title').
requires(
	'impact.game', 
	'impact.font',
	'plugins.observable',
	'game.scenes.level'
).defines(function() {

	TitleScene = ig.Game.extend({
		font: new ig.Font('media/04b03.font.png'),

		logo: new ig.Image('media/titleLogo.png'),

		init: function() {
			ig.numLives = 5;
		},

		update: function() {
			this.parent();

			if(ig.input.pressed('jump')) {
				ig.currentLevel = 0;
				this.fireEvent('scene-complete', 'LevelScene');
			}
		},

		draw: function() {
			this.parent();

			ig.system.context.fillStyle = 'orange';
			ig.system.context.fillRect(0, 0, ig.system.realWidth, ig.system.realHeight);

			this.logo.draw(50, 10);

			if(Gamepad.getState(0)) {
				this.font.draw('press (A)', ig.system.width / 2, ig.system.height / 2 + 44, ig.Font.ALIGN.CENTER);
				this.font.draw('(gamepad support is very experimental, might not work for you,', ig.system.width / 2, ig.system.height / 2 + 70, ig.Font.ALIGN.CENTER);
				this.font.draw('if it doesn\'t, unplug the gamepad for keyboard support)', ig.system.width / 2, ig.system.height / 2 +80, ig.Font.ALIGN.CENTER);
			} else {
				this.font.draw("press 'M' to begin", ig.system.width / 2, ig.system.height / 2 + 44, ig.Font.ALIGN.CENTER);
			}
			
			this.font.draw("Global Game Jame 2013, by Matt Greer", 20, ig.system.height - 10);
		}
	});
});




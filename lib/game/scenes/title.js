ig.module('game.scenes.title').
requires(
	'impact.game', 
	'impact.font',
	'plugins.observable',
	'game.scenes.level'
).defines(function() {

	TitleScene = ig.Game.extend({
		font: new ig.Font('media/04b03.font.png'),

		update: function() {
			this.parent();

			if(ig.input.pressed('jump')) {
				this.fireEvent('scene-complete', 'LevelScene');
			}
		},

		draw: function() {
			this.parent();
			this.font.draw('cell mates', ig.system.width / 2, ig.system.height / 2, ig.Font.ALIGN.CENTER);
			this.font.draw("press 'M' to begin", ig.system.width / 2, ig.system.height / 2 + 14, ig.Font.ALIGN.CENTER);
			this.drawGamePadInfo();
		},

		drawGamePadInfo: function() {
			if(Gamepad.getState(0)) {
				this.font.draw('You have a gamepad! press (A) to begin', ig.system.width / 2, ig.system.height / 2 + 40, ig.Font.ALIGN.CENTER);
				this.font.draw('(gamepad support is very experimental, might not work for you)', ig.system.width / 2, ig.system.height / 2 + 50, ig.Font.ALIGN.CENTER);
			}
		}
	});
});




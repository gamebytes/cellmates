ig.module('game.scenes.win').
requires(
	'impact.game', 
	'impact.font',
	'plugins.observable',
	'game.scenes.title'
).defines(function() {

	WinScene = ig.Game.extend({
		font: new ig.Font('media/04b03.font.png'),

		init: function() {
			this.timer = new ig.Timer(2);
		},

		update: function() {
			this.parent();

			if(ig.input.pressed('jump') || this.timer.delta() > 0) {
				this.fireEvent('scene-complete', 'TitleScene');
			}
		},

		draw: function() {
			this.parent();
			this.font.draw('You guys rock!', ig.system.width / 2, ig.system.height / 2, ig.Font.ALIGN.CENTER);
		}
	});
});






ig.module('game.scenes.game-over').
requires(
	'impact.game', 
	'impact.font',
	'plugins.observable',
	'game.scenes.title'
).defines(function() {

	GameOverScene = ig.Game.extend({
		font: new ig.Font('media/04b03.font.png'),

		init: function() {
			ig.input.bind(ig.KEY.X, 'next');
			this.timer = new ig.Timer(2);
		},

		update: function() {
			this.parent();

			if(ig.input.pressed('next') || this.timer.delta() > 0) {
				this.fireEvent('scene-complete', 'TitleScene');
			}
		},

		draw: function() {
			this.parent();
			this.font.draw('Game Over :(', ig.system.width / 2, ig.system.height / 2, ig.Font.ALIGN.CENTER);
		}
	});
});





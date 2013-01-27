ig.module('game.scenes.game-over').
requires(
	'impact.game', 
	'impact.font',
	'plugins.observable',
	'game.scenes.title'
).defines(function() {

	GameOverScene = ig.Game.extend({
		font: new ig.Font('media/04b03.font.png'),
		logo: new ig.Image('media/gameOverLogo.png'),
		death: new ig.Sound('media/audio/death.*'),

		init: function() {
			ig.input.bind(ig.KEY.X, 'next');
			this.timer = new ig.Timer(4);
			this.death.play();
		},

		update: function() {
			this.parent();

			if(ig.input.pressed('next') || this.timer.delta() > 0) {
				this.fireEvent('scene-complete', 'TitleScene');
			}
		},

		draw: function() {
			this.parent();

			ig.system.context.fillStyle = 'orange';
			ig.system.context.fillRect(0, 0, ig.system.realWidth, ig.system.realHeight);

			this.logo.draw(50, 10);

			this.font.draw('Game Over!', ig.system.width / 2, ig.system.height / 2 + 44, ig.Font.ALIGN.CENTER);
		}
	});
});





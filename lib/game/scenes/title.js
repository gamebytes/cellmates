ig.module('game.scenes.title').
requires(
	'impact.game', 
	'impact.font',
	'plugins.observable',
	'game.scenes.level'
).defines(function() {

	TitleScene = ig.Game.extend({
		font: new ig.Font('media/04b03.font.png'),

		init: function() {
			ig.input.bind(ig.KEY.M, 'next');
		},

		update: function() {
			this.parent();

			if(ig.input.pressed('next')) {
				this.fireEvent('scene-complete', 'LevelScene');
			}
		},

		draw: function() {
			this.parent();
			this.font.draw('heartbeat game needs a name!', ig.system.width / 2, ig.system.height / 2, ig.Font.ALIGN.CENTER);
			this.font.draw("press 'M' to begin", ig.system.width / 2, ig.system.height / 2 + 14, ig.Font.ALIGN.CENTER);
		}
	});
});




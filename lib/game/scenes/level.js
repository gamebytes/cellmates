ig.module('game.scenes.level').
requires(
'game.levels.hello', 'plugins.observable', 'impact.font'
).defines(function() {

	LevelScene = ig.Game.extend({
		gravity: 300,

		font: new ig.Font('media/04b03.font.png'),

		vel: {
			x: 10,
			y: 0
		},

		init: function() {
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.M, 'jump');

			ig.input.bind(ig.KEY.Q, 'heart-up');
			ig.input.bind(ig.KEY.A, 'heart-down');

			this.loadLevel(LevelHello);

			this.goal = this.getEntitiesByType(EntityGoalTrigger)[0];

			this.goal.on('player-made-it', this.onPlayerMadeIt.bind(this));

			this.player = this.getEntitiesByType(EntityPlayer)[0];
		},

		onPlayerMadeIt: function() {
			this.madeIt = true;

			//var me = this;
			//setTimeout(function() {
				//me.fireEvent('scene-complete', 'TitleScene');
			//}, 2000);
		},

		update: function() {
			this.screen.x += this.vel.x * ig.system.tick;
			this.parent();

			this.player.pos.x = Math.max(this.player.pos.x, this.screen.x);

			if (this.player.pos.y > this.height) {
				this.fireEvent('scene-complete', 'GameOverScene');
			}
		},


		draw: function() {
			this.parent();

			this.font.draw('Arrow Keys, X', 2, 2);

			if(this.madeIt) {
				this.font.draw('good job!', 50, 80);
			}
		},

		getMap: function(name) {
			return this.backgroundMaps.filter(function(m) {
				return m.name === name
			})[0];
		}
	});

	Object.defineProperty(LevelScene.prototype, 'height', {
		get: function() {
			var map = this.getMap('platforms');
			return (map && (map.height * this.collisionMap.tilesize)) || 0;
		}
	});
});



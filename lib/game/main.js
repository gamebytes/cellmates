(function() {
	var requires = ['impact.game', 'impact.font', 'game.entities.player', 'game.levels.hello', 'plugins.observable', ];

	if (window.location.href.indexOf('debug') > - 1) {
		requires.push('impact.debug.debug');
	}

	var module = ig.module('game.main');
	module.requires.apply(module, requires).defines(function() {
		MyGame = ig.Game.extend({

			gravity: 300,

			vel: {
				x: 10,
				y: 0
			},

			// Load a font
			font: new ig.Font('media/04b03.font.png'),

			init: function() {
				ig.input.bind(ig.KEY.Q, 'heart-up');
				ig.input.bind(ig.KEY.A, 'heart-down');

				ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
				ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
				ig.input.bind(ig.KEY.X, 'jump');

				this.loadLevel(LevelHello);

				this.goalTrigger = this.getEntitiesByType(EntityGoalTrigger)[0];
				this.goalTrigger.on('player-made-it', this._onPlayerMadeIt.bind(this));
				this.player = this.getEntitiesByType(EntityPlayer)[0];
			},

			update: function() {
				this.screen.x += this.vel.x * ig.system.tick;
				this.parent();

				if(this.player.pos.x < this.screen.x) {
					this.player.pos.x = this.screen.x;
				}

				if(this.player.pos.y > ig.system.height) {
					window.location.href = window.location.href;
				}
			},

			draw: function() {
				this.parent();

				if (this.playerMadeIt) {
					this.font.draw('good job!', 10, 10);
				}
			},

			_onPlayerMadeIt: function() {
				// TODO: go to win screen
				this.playerMadeIt = true;
			}
		});

		ig.main('#canvas', MyGame, 60, 320, 240, 2);

	});
})();


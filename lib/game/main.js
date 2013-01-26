ig.module('game.main')
.requires(
	'impact.game',
	'impact.font', 
	'game.entities.player', 
	'game.entities.spike',
	'game.levels.hello',
	'plugins.observable',
	'impact.debug.debug'
).defines(function() {

	MyGame = ig.Game.extend({

		gravity: 300,

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
		},

		update: function() {
			this.parent();
		},

		draw: function() {
			this.parent();

			if(this.playerMadeIt) {
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


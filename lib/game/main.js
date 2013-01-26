ig.module('game.main').requires('impact.game', 'impact.font', 'game.entities.player', 'game.entities.spike',

'game.levels.hello',

'impact.debug.debug').defines(function() {

	MyGame = ig.Game.extend({

		gravity: 300,

		// Load a font
		font: new ig.Font('media/04b03.font.png'),

		init: function() {
			ig.input.bind(ig.KEY.Q, 'heart-up');
			ig.input.bind(ig.KEY.A, 'heart-down');

			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.M, 'jump');

			// Load the LevelTest as required above ('game.level.test')
			this.loadLevel(LevelHello);
		},

		update: function() {
			// Update all entities and backgroundMaps
			this.parent();

			// Add your own, additional update code here
		},

		draw: function() {
			// Draw all entities and backgroundMaps
			this.parent();
		}
	});

	// Start the Game with 60fps, a resolution of 320x240, scaled
	// up by a factor of 2
	ig.main('#canvas', MyGame, 60, 320, 240, 2);

});


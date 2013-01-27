ig.module('game.entities.goal-trigger')
.requires('impact.entity'
)
.defines(function() {

	EntityGoalTrigger = ig.Entity.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.BOTH,

		size: {
			x: 16,
			y: 32
		},

		animSheet: new ig.AnimationSheet('media/goal.png', 16, 32),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
		},

		check: function(other) {
			if(other.isPlayer) {
				this.fireEvent('player-made-it', this);
			}
		}
	});
});



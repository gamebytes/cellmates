ig.module('game.entities.refill').requires('impact.entity').defines(function() {

	EntityRefill = ig.Entity.extend({

		size: {
			x: 8,
			y: 8
		},

		collides: ig.Entity.COLLIDES.PASSIVE,
		checkAgainst: ig.Entity.TYPE.A,
		type: ig.Entity.TYPE.B,
		gravityFactor: 0,

		animSheet: new ig.AnimationSheet('media/refill.png', 8, 8),

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('idle', 1, [0]);
		},

		check: function(other) {
			if(other.isPlayer) {
				this.fireEvent('refill-acquired');
				this.kill();
			}
		}
	});
});



ig.module('game.entities.heart').requires('impact.entity').defines(function() {

	EntityHeart = ig.Entity.extend({

		size: {
			x: 24,
			y: 16
		},

		maxVel: {
			x: 100,
			y: 200
		},

		baseAccel: 200,
		gravityFactor: 0,


		animSheet: new ig.AnimationSheet('media/tiles8.png', 24, 16),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);

		},

		update: function() {
			if (ig.input.state('heart-up')) {
				this.vel.y = -this.baseAccel;
			}
			else if (ig.input.state('heart-down')) {
				this.vel.y = this.baseAccel;
			}
			else {
				this.vel.y = 0;
			}

			this.parent();
		}
	});
});


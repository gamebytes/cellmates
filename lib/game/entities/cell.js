ig.module('game.entities.cell').requires('impact.entity').defines(function() {

	EntityCell = ig.Entity.extend({

		size: {
			x: 8,
			y: 8
		},

		maxVel: {
			x: 100,
			y: 200
		},

		vel: {
			x: 30,
			y: 0
		},

		gravityFactor: 0,
		collides: ig.Entity.COLLIDES.FIXED,

		animSheet: new ig.AnimationSheet('media/tiles8.png', 8, 8),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			if (this.red) {
				this.addAnim('idle', 1, [3]);
			} else {
				this.addAnim('idle', 1, [4]);
			}
		},

		update: function() {
			this.parent();

			if(this.pos.x > ig.game.screen.x + ig.system.width) {
				this.kill();
			}
		}
	});
});


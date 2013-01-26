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
		checkAgainst: ig.Entity.TYPE.A,
		type: ig.Entity.TYPE.B,

		animSheet: new ig.AnimationSheet('media/tiles8.png', 8, 8),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			if (this.red) {
				this.floatVel = -10;
				this.addAnim('idle', 1, [3]);
			} else {
				this.floatVel = 10;
				this.addAnim('idle', 1, [4]);
			}
		},

		update: function() {
			this.parent();

			if (this.pos.x > ig.game.screen.x + ig.system.width) {
				this.kill();
			}
		},

		handleMovementTrace: function(res) {
			if (res.collision.x) {
				this.kill();
			} else {
				this.parent(res);
			}
		},

		check: function(other) {
			if(other.canStandOnCell) {
				this.pos.y += this.floatVel * ig.system.tick;
			}
		}

	});
});


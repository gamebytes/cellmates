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

		standingCount: 0,
		standingDuration: 3,

		gravityFactor: 0,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.A,
		type: ig.Entity.TYPE.B,

		animSheet: new ig.AnimationSheet('media/cells.png', 8, 8),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			if (this.red) {
				this.floatVel = - 10;
				this.addAnim('idle', 1, [3]);
				this.addAnim('death', 0.1, [13, 14], true);
				this.addAnim('dyingWarning', 0.2, [33, 34]);
			} else {
				this.floatVel = 10;
				this.addAnim('idle', 1, [4]);
				this.addAnim('death', 0.1, [23, 24], true);
				this.addAnim('dyingWarning', 0.2, [43, 44]);
			}
		},

		update: function() {
			this.parent();

			if (this.pos.x > ig.game.screen.x + ig.system.width) {
				this.kill();
			}

			if (this.dying && this.currentAnim.loopCount > 0) {
				this.kill();
			}

			if (!this.dying) {
				if (this.standingCount >= this.standingDuration * 0.5) {
					this.currentAnim = this.anims.dyingWarning;
				} else {
					this.currentAnim = this.anims.idle;
				}
			}
		},

		die: function() {
			if (!this.dying) {
				this.dying = true;
				this.currentAnim = this.anims.death;
				this.currentAnim.rewind();
				this.collides = ig.Entity.COLLIDES.NONE;
			}
		},

		handleMovementTrace: function(res) {
			// This completely ignores the trace result (res) and always
			// moves the entity according to its velocity
			this.pos.x += this.vel.x * ig.system.tick;
			this.pos.y += this.vel.y * ig.system.tick;
		},

		check: function(other) {
			if (other.canStandOnCell) {
				this.pos.y += this.floatVel * ig.system.tick;
			}
		}

	});
});


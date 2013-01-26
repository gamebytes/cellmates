ig.module('game.entities.cell').requires('impact.entity').defines(function() {

	EntityCell = ig.Entity.extend({

		size: {
			x: 16,
			y: 8
		},

		maxVel: {
			x: 500,
			y: 200
		},

		vel: {
			x: 35,
			y: 0
		},

		standingCount: 0,
		standingDuration: 5,

		gravityFactor: 0,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.BOTH,
		type: ig.Entity.TYPE.B,
		etype: 'cell',
		collideIgnoreSameType: true,

		animSheet: new ig.AnimationSheet('media/cells.png', 16, 8),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			if (this.red) {
				this.floatVel = - 10;
				this.addAnim('idle', 1, [0]);
				this.addAnim('death', 0.1, [5, 6], true);
				this.addAnim('dyingWarning', 0.2, [15, 16]);
			} else {
				this.floatVel = 10;
				this.addAnim('idle', 1, [1]);
				this.addAnim('death', 0.1, [10, 11], true);
				this.addAnim('dyingWarning', 0.2, [20, 21]);
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
			if(other.etype === 'monster') {
				other.die();
			}
		}

	});
});


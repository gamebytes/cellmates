ig.module('game.entities.player').requires('impact.entity').defines(function() {

	EntityPlayer = ig.Entity.extend({

		// The players (collision) size is a bit smaller than the animation
		// frames, so we have to move the collision box a bit (offset)
		size: {
			x: 8,
			y: 14
		},
		offset: {
			x: 4,
			y: 2
		},

		maxVel: {
			x: 100,
			y: 200
		},
		friction: {
			x: 600,
			y: 0
		},
		isPlayer: true,

		type: ig.Entity.TYPE.A,
		// Player friendly group
		checkAgainst: ig.Entity.TYPE.NONE,

		animSheet: new ig.AnimationSheet('media/player.png', 16, 16),

		// These are our own properties. They are not defined in the base
		// ig.Entity class. We just use them internally for the Player
		flip: false,
		accelGround: 400,
		accelAir: 200,
		jump: 500,
		health: 10,
		flip: false,

		init: function(x, y, settings) {
			Object.defineProperty(this, 'collides', {
				get: function() {
					if (this.vel.y < 0) {
						return ig.Entity.COLLIDES.NONE;
					}
					return ig.Entity.COLLIDES.PASSIVE;
				}
			});

			this.parent(x, y, settings);

			// Add the animations
			this.addAnim('idle', 1, [0]);
			this.addAnim('run', 0.07, [0, 1, 2, 3, 4, 5]);
			this.addAnim('jump', 1, [9]);
			this.addAnim('fall', 0.4, [6, 7]);
		},

		update: function() {

			// move left or right
			var accel = this.standing ? this.accelGround: this.accelAir;
			if (ig.input.state('left')) {
				this.accel.x = - accel;
				this.flip = true;
			}
			else if (ig.input.state('right')) {
				this.accel.x = accel;
				this.flip = false;
			}
			else {
				this.accel.x = 0;
			}

			if (this.standing && ig.input.pressed('jump')) {
				this.vel.y = - this.jump;
			}

			// set the current animation, based on the player's speed
			if (this.vel.y < 0) {
				this.currentAnim = this.anims.jump;
			}
			else if (this.vel.y > 0) {
				this.currentAnim = this.anims.fall;
			}
			else if (this.vel.x != 0) {
				this.currentAnim = this.anims.run;
			}
			else {
				this.currentAnim = this.anims.idle;
			}

			this.currentAnim.flip.x = this.flip;

			// move!
			this.parent();

			var screenWidth = 8 * 40;
			if (this.pos.x > screenWidth && this.last.x < screenWidth) {
				this.pos.x = 0;
			} else if (this.pos.x < 0 && this.last.x > 0) {
				this.pos.x = screenWidth;
			}
		}
	});
});


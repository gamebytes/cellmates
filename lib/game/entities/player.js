ig.module('game.entities.player').requires('impact.entity').defines(function() {

	EntityPlayer = ig.Entity.extend({
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
		visible: true,
		etype: 'player',

		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.NONE,

		animSheet: new ig.AnimationSheet('media/player.png', 16, 16),

		flip: false,
		accelGround: 400,
		accelAir: 200,
		jump: 500,
		jumpSfx: new ig.Sound('media/audio/jump.*'),
		health: 10,
		flip: false,
		health: 1,

		init: function(x, y, settings) {
			Object.defineProperty(this, 'collides', {
				get: function() {
					if(this.__collides) {
						return this.__collides;
					}
					if (this.vel.y <= 0) {
						return ig.Entity.COLLIDES.NONE;
					}
					return ig.Entity.COLLIDES.PASSIVE;
				},
				set: function(c) {
					this.__collides = c;
				}
			});

			Object.defineProperty(this, 'canStandOnCell', {
				get: function() {
					return this.collides === ig.Entity.COLLIDES.PASSIVE && !this.standing;
				}
			});

			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.addAnim('run', 0.07, [0, 1, 2, 3, 4, 5]);
			this.addAnim('jump', 1, [9]);
			this.addAnim('fall', 0.4, [6, 7]);
		},

		update: function() {
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
				this.jumpSfx.play();
			}

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

			this.parent();

			if(this.standing) {
				this.lastStandingPos = ig.copy(this.pos);
			}
		},

		receiveDamage: function() {
			this.fireEvent('player-death', this);
		}
	});
});


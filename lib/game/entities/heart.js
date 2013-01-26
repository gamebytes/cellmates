ig.module('game.entities.heart')
.requires(
	'impact.entity',
	'game.entities.cell',
	'plugins.center'

).defines(function() {

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
		collides: ig.Entity.COLLIDES.FIXED,


		animSheet: new ig.AnimationSheet('media/tiles8.png', 24, 16),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);

			this.releaseTimer = new ig.Timer(1.5);
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

			if(this.releaseTimer.delta() > 0) {
				this.releaseTimer.reset();
				ig.game.spawnEntity(EntityCell, this.center.x + this.size.x / 2, this.center.y, {
					red: Math.random() < 0.75
				});
			}

			this.parent();
		}
	});

	EntityHeart.inject(MixinCenter);
});

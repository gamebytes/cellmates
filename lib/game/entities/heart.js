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
		maxCells: 20,
		cellCount: 20,
		collides: ig.Entity.COLLIDES.FIXED,


		animSheet: new ig.AnimationSheet('media/heart.png', 24, 16),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('full', 1, [0]);
			this.addAnim('down1', 1, [1]);
			this.addAnim('down2', 1, [2]);
			this.addAnim('down3', 1, [3]);
			this.addAnim('down4', 1, [4]);
			this.addAnim('empty', 1, [5]);

			this.allAnims = [
				this.anims.empty,
				this.anims.down4,
				this.anims.down3,
				this.anims.down2,
				this.anims.down1,
				this.anims.full
			];

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

			if(this.releaseTimer.delta() > 0 && this.cellCount > 0) {
				--this.cellCount;
				this.releaseTimer.reset();
				ig.game.spawnEntity(EntityCell, this.center.x + this.size.x / 2, this.center.y, {
					red: Math.random() < 0.75
				});
			}

			var index = Math.ceil(this.cellCount.map(0, this.maxCells, 0, this.allAnims.length - 1));
			this.currentAnim = this.allAnims[index];

			this.pos.x = ig.game.screen.x + 5;
			this.parent();
		}
	});

	EntityHeart.inject(MixinCenter);
});

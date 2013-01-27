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
		etype: 'heart',
		checkAgainst: ig.Entity.TYPE.A,

		slowPumpDuration: 2,
		fastPumpDuration: 0.6,
		dangerLevel: 0,
		dangerMax: 5,

		gravityFactor: 0,
		maxCells: 20,
		cellCount: 20,
		collides: ig.Entity.COLLIDES.FIXED,
		etype: 'heart',
		flatline: new ig.Sound('media/audio/flatline.*'),


		animSheet: new ig.AnimationSheet('media/heart.png', 24, 16),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			var frameDuration = this.onePumpDuration / 2;
			this.addAnim('full', frameDuration, [1,0]);
			this.addAnim('down1', frameDuration, [3,2]);
			this.addAnim('down2', frameDuration, [5,4]);
			this.addAnim('down3', frameDuration, [7,6]);
			this.addAnim('down4', frameDuration, [9,8]);
			this.addAnim('empty', frameDuration, [11,10]);

			this.addAnim('heartAttack', 0.2, [12, 13], true);

			this.allAnims = [
				this.anims.empty,
				this.anims.down4,
				this.anims.down3,
				this.anims.down2,
				this.anims.down1,
				this.anims.full
			];

			this.releaseTimer = new ig.Timer();

			this.setMode('slow');
		},

		update: function() {
			if(!this.dying) {
				this.pos.y = ig.input.mouse.y.limit(0, 25 * ig.game.collisionMap.tilesize - this.size.y);

				if(ig.input.pressed('toggle-heartrate')) {
					this.toggleHeartRate();
				}

				if(this.releaseTimer.delta() > 0 && this.cellCount > 0) {
					--this.cellCount;
					this.releaseTimer.reset();
					var cell = ig.game.spawnEntity(EntityCell, this.center.x + this.size.x / 2, this.center.y - 4, {
						red: Math.random() < 0.75
					});

					if(this.currentMode === 'fast') {
						cell.vel.x *= 1.5;
					}
				}

				var index = Math.ceil(this.cellCount.map(0, this.maxCells, 0, this.allAnims.length - 1));
				this.currentAnim = this.allAnims[index];

				if(this.currentMode === 'fast') {
					this.dangerLevel += ig.system.tick;
				} else {
					this.dangerLevel -= ig.system.tick;
				}

				this.dangerLevel = this.dangerLevel.limit(0, this.dangerMax);
				if(this.dangerLevel === this.dangerMax) {
					this.die();
				}
			} else if(this.currentAnim.loopCount > 0) {
				this.fireEvent('heart-death', this);
			}

			this.pos.x = ig.game.screen.x + 9;
			this.parent();
		},

		die: function() {
			if(!this.dying) {
				this.flatline.play();
				this.dying = true;
				this.currentAnim = this.anims.heartAttack;
				this.currentAnim.rewind();
			}
		},

		toggleHeartRate: function() {
			if(this.currentMode === 'fast') {
				this.setMode('slow');
			} else {
				this.setMode('fast');
			}
		},

		setMode: function(mode) {
			if(this.currentMode !== mode) {
				this.currentMode = mode;
				this.onePumpDuration = mode === 'fast' ? this.fastPumpDuration : this.slowPumpDuration;
				this.releaseTimer.set(this.onePumpDuration);

				this.allAnims.forEach(function(anim) {
					anim.frameTime = this.onePumpDuration / 2;
				}, this);
			}
		},

		check: function(other) {
			this.playerStandingOn = other.etype === 'player' && other.canStandOnCell;
		}
	});

	EntityHeart.inject(MixinCenter);

	Object.defineProperties(EntityHeart.prototype, {
		heartRate: {
			get: function() {
				return Math.round(60 / this.onePumpDuration);
			}
		},
		inDanger: {
			get: function() {
				return this.currentMode === 'fast';
			}
		}
	});
});

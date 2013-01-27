ig.module('game.scenes.level').
requires(
	'impact.font',
'game.levels.hello',
'game.levels.level1',
'plugins.observable', 'plugins.same-type-collision', 'plugins.gamepad'
).defines(function() {


	ig.levels = ig.levels || [];
	ig.levels.push(LevelLevel1);

	LevelScene = ig.Game.extend({
		gravity: 300,

		font: new ig.Font('media/04b03.font.png'),
		redFont: new ig.Font('media/redFont.png'),
		oneup: new ig.Image('media/1up.png'),

		vel: {
			x: 20,
			y: 0
		},

		init: function() {
			this.loadLevel(ig.copy(ig.levels[ig.currentLevel]));

			this.goal = this.getEntitiesByType(EntityGoalTrigger)[0];

			this.goal.on('player-made-it', this.onPlayerMadeIt.bind(this));

			this.player = this.getEntitiesByType(EntityPlayer)[0];
			this.player.on('player-death', this.onPlayerDeath.bind(this));
		
			this.heart = this.getEntitiesByType(EntityHeart)[0];
			this.heart.on('heart-death', this.onHeartDeath.bind(this));

			this.dangerMeter = this.getEntitiesByType(EntityDangerMeter)[0];
			this.dangerMeter.heart = this.heart;

			var onRefillAcquired = this.onRefillAcquired.bind(this);
			this.getEntitiesByType(EntityRefill).forEach(function(refill) {
				refill.on('refill-acquired', onRefillAcquired);
			});

			ig.music.play();
		},

		getTileAtPixelPosition: function(px, py) {
			var ts = this.collisionMap.tilesize;

			var tx = (px / ts) | 0;
			var ty = (py / ts) | 0;

			return { x: tx, y: ty };
		},

		onPlayerDeath: function() {
			--ig.numLives;

			if(ig.numLives === 0) {
				ig.music.stop();
				this.fireEvent('scene-complete', 'GameOverScene');
			} else {
				this.player.pos = this.player.lastStandingPos;
				var tile = this.getTileAtPixelPosition(this.player.pos.x, this.player.pos.y);
				this.player.pos.x = tile.x * this.collisionMap.tilesize + this.collisionMap.tilesize / 2;

				if(this.player.pos.x < this.screen.x) {
					this.screen.x = Math.max(this.player.pos.x - 30, 0);
				}
			}
		},

		onHeartDeath: function() {
			this.heartDead = true;
			this.heart.kill();
			this.dangerMeter.kill();
		},

		onRefillAcquired: function() {
			this.heart.cellCount  = (this.heart.cellCount + 10).limit(0, this.heart.maxCells);
		},

		onPlayerMadeIt: function() {
			this.madeIt = true;
			ig.music.stop();

			var me = this;
			setTimeout(function() {
				++ig.currentLevel;
				if(ig.currentLevel >= ig.levels.length) {
					me.fireEvent('scene-complete', 'WinScene');
				} else {
					me.fireEvent('scene-complete', 'LevelScene');
				}
			}, 1000);
		},

		update: function() {
			this.heart.playerStandingOn = false;
			this.setCellsLastY();

			var screenDelta = this.vel.x * ig.system.tick;
			this.screen.x += screenDelta;
			this.parent();

			this.checkForStandingOnCells();

			if(this.heart.playerStandingOn) {
				this.lastWasStandingOnHeart = true;
				this.heart.setMode('fast');
				this.player.pos.x += screenDelta;
			} else {
				if(this.lastWasStandingOnHeart) {
					this.lastWasStandingOnHeart = false;
					this.heart.setMode('slow');
				}
			}

			this.player.pos.x = Math.max(this.player.pos.x, this.screen.x);

			if (this.player.pos.y > this.height) {
				this.onPlayerDeath();
			}
		},

		getCells: function() {
			return this.getEntitiesByType(EntityCell);
		},

		setCellsLastY: function() {
			var cells = this.getCells();

			for(var i = 0; i < cells.length; ++i) {
				cells[i].lastY = cells[i].pos.y;
			}
		},

		checkForStandingOnCells: function() {
			var cells = this.getCells();

			for(var i = 0; i < cells.length; ++i) {
				var cell = cells[i];
				if(cell.lastY !== cell.pos.y) {
					cell.standingCount += ig.system.tick;
				} else {
					cell.standingCount = 0;
				}

				if(cell.standingCount >= cell.standingDuration) {
					cell.die();
				}
			}
		},

		drawHeartRate: function() {
			var font = this.heart.inDanger ? this.redFont : this.font;
			var x = 10;

			if(this.heart.inDanger) {
				x += Math.random() * 2;
			}

			font.draw("heart rate: " + this.heart.heartRate, x, ig.system.height - 20);
		},

		drawNumberOfLives: function() {
			var x = 10;
			for(var i = 0; i < ig.numLives; ++i) {
				this.oneup.draw(x, ig.system.height - 10);
				x += 10;
			}
		},

		draw: function() {
			this.parent();

			if(!this.heartDead) {
				this.drawHeartRate();
			}

			this.drawNumberOfLives();

			if(this.madeIt) {
				this.font.draw('good job!', 50, 80);
			}
		},

		getMap: function(name) {
			return this.backgroundMaps.filter(function(m) {
				return m.name === name
			})[0];
		}
	});

	Object.defineProperty(LevelScene.prototype, 'height', {
		get: function() {
			var map = this.getMap('platforms');
			return (map && (map.height * this.collisionMap.tilesize)) || 0;
		}
	});
});



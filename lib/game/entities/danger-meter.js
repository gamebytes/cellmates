ig.module('game.entities.danger-meter').requires('impact.entity').defines(function() {

	EntityDangerMeter = ig.Entity.extend({

		_wmDrawBox: true,
		_wmBoxColor: 'red',
		_wmScalable: true,

		etype: 'danger-meter',

		gravityFactor: 0,

		draw: function() {
			this.parent();
			if(!this.heart) {
				return;
			}

			ig.system.context.save();

			var x = this.pos.x * ig.system.scale;
			var y = this.pos.y * ig.system.scale;

			var dangerPercent = this.heart.dangerLevel / this.heart.dangerMax;
			var dangerWidth = this.size.x * dangerPercent * ig.system.scale;

			if(dangerPercent > 0.7) {
				x += Math.random() * 5;
				y += Math.random() * 5;
			}

			var width = this.size.x * ig.system.scale;
			var height = this.size.y * ig.system.scale;

			ig.system.context.fillStyle = 'red';
			ig.system.context.fillRect(x, y, dangerWidth, height);

			ig.system.context.strokeStyle = 'white';
			ig.system.context.strokeRect(x, y, width, height);

			ig.system.context.restore();
		}

	});
});




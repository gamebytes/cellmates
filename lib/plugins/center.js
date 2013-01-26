ig.module('plugins.center').defines(function() {

	MixinCenter = {
		center: {},

		draw: function() {
			this.parent();
			if (ig.drawDebugInfo) {
				this._drawCenter();
				this._drawBoundingBox();
			}
		},

		update: function() {
			this.parent();
			this.center.x = this.pos.x + this.size.x / 2;
			this.center.y = this.pos.y + this.size.y / 2;
		},

		_drawCenter: function() {
			var c = ig.system.context;
			var s = ig.system.scale;
			c.fillStyle = 'magenta';
			var size = 2;
			c.fillRect((this.center.x - (size / 2) - ig.game.screen.x) * s, (this.center.y - (size / 2) - ig.game.screen.y) * s, size * s, size * s);
		},

		_drawBoundingBox: function() {
			var c = ig.system.context;
			var s = ig.system.scale;
			c.strokeStyle = this.boundingBoxColor || 'rgb(100, 255, 20)';
			c.strokeRect((this.pos.x - ig.game.screen.x) * s, (this.pos.y - ig.game.screen.y) * s, this.size.x * s, this.size.y * s);
		}
	};

});



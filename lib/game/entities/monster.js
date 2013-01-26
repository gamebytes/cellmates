ig.module('game.entities.monster').requires('impact.entity', 'game.entities.base-monster').defines(function() {

	EntityMonster = EntityBaseMonster.extend({
		_wmIgnore: false,

		size: {
			x: 8,
			y: 8
		},
		etype: 'monster',

		animSheet: new ig.AnimationSheet('media/monster.png', 8, 8),

		init: function(x, y, settings) {
			this.parent(x, y, settings);
		},

		setupAnimation: function() {
			this.addAnim('idle', 0.3, [0,1,2]);
		},

		die: function() {
			// TODO: death animation
			this.kill();
		},

		check: function(other) {
			this.parent(other);
			this.die();
		}
	});
});




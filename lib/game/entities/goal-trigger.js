ig.module('game.entities.goal-trigger')
.requires('impact.entity'
)
.defines(function() {

	EntityGoalTrigger = ig.Entity.extend({
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(128, 28, 230, 0.7)',
		_wmScalable: true,

		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.BOTH,

		size: {
			x: 16,
			y: 16
		},

		check: function(other) {
			if(other.isPlayer) {
				this.fireEvent('player-made-it', this);
			}
		}
	});
});



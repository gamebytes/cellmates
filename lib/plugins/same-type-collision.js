ig.module('plugins.same-type-collision').requires('impact.entity').defines(function() {

	var originalCheckPair = ig.Entity.checkPair;

	ig.Entity.checkPair = function(a, b) {
		if (a.collideIgnoreSameType || b.collideIgnoreSameType) {
			if (typeof a.etype !== 'undefined' && a.etype === b.etype) {
				return;
			}
		}

		originalCheckPair.call(ig.Entity, a, b);
	};
});


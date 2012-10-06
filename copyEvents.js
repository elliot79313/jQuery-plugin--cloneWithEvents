/* Copyright (c) 2006 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * $LastChangedDate: 2007-01-25 22:15:05 -0600 (Thu, 25 Jan 2007) $
 * $Rev: 1205 $
 */

jQuery.fn.extend({
	/**
	 * Copies event handlers from the first matched
	 * element passed in from the jQuery object to all
	 * the current matched elements in the jQuery object.
	 *
	 * @name copyEvents
	 * @param jQuery|String|DOM Element jQuery object to copy events from. Only uses the first matched element.
	 * @type jQuery
	 * @cat Plugins/copyEvents
	 * @author Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
	 */
	copyEvents: function(from) {
		jQuery.event.copy(from, this);
		return this;
	},
	
	/** 
	 * Copies event handlers to all the matched
	 * elements from the passed in jQuery object from 
	 * the first matched element in the jQuery object.
	 *
	 * @name copyEventsTo
	 * @param jQuery|String|DOM Element jQuery object to copy events to. Copies to all matched elements.
	 * @type jQuery
	 * @cat Plugins/copyEvents
	 * @author Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
	 */
	copyEventsTo: function(to) {
		jQuery.event.copy(this, to);
		return this;
	},
	
	/**
	 * Does a .clone() and also copies the events.
	 * 
	 * @name cloneWithEvents
	 * @type jQuery
	 * @param Boolean deep (Optional) Set to false if you don't want to clone all descendant nodes, in addition to the element itself.
	 * @cat Plugins/copyEvents
	 * @author Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
	 */
	cloneWithEvents: function(deep) {
		return this.clone( deep ).copyEvents( this );
	}
});

/**
 * Logic for copying events from one jQuery object to another.
 *
 * @private	
 * @name jQuery.events.copy
 * @param jQuery|String|DOM Element jQuery object to copy events from. Only uses the first matched element.
 * @param jQuery|String|DOM Element jQuery object to copy events to. Copies to all matched elements.
 * @type undefined
 * @cat Plugins/copyEvents
 * @author Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 */
jQuery.event.copy = function(from, to) {
	from = (from.jquery) ? from : jQuery(from);
	to   = (to.jquery)   ? to   : jQuery(to);
	
	if (!from.size() || !from[0].events || !to.size()) return;
		
	var events = from[0].events;
	to.each(function() {
		for (var type in events)
			for (var handler in events[type])
				jQuery.event.add(this, type, events[type][handler], events[type][handler].data);
	});
};
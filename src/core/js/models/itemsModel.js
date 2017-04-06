define([
    'core/js/adapt',
    'core/js/models/componentModel'
], function(Adapt, ComponentModel) {

    var ItemsModel = ComponentModel.extend({

        reset: function(type, force) {
            this.resetItems();
            ComponentModel.prototype.reset.call(this, type, force);
        },

        resetItems: function() {
            _.each(this.get('_items'), function(item) {
                item._isVisited = false;
                item._isActive = false;
            });
        },
        
        getItemCount: function() {
            return this.get('_items').length;
        },

        getItemAtIndex: function(index) {
            return this.get('_items')[index];
        },

        getVisitedItems: function() {
            return _.filter(this.get('_items'), function(item) {
                return item._isVisited;
            });
        },

        setItemAtIndexAsVisited: function(index) {
            var item = this.get('_items')[index];
            item._isVisited = true;
        },

        getCompletionStatus: function() {
            return (this.getVisitedItems().length == this.get('_items').length);
        },

        checkCompletionStatus: function() {
            if (this.getCompletionStatus()) {
                this.setCompletionStatus();
            }
        },

        resetActiveItems: function(trigger) {
            var items = this.get('_items');

            _.each(items, function(item) {
                item._isActive = false;
            });

            if (trigger !== false) this.trigger('change:_items:_isActive', this, items);
        },

        getActiveItems: function() {
            return _.filter(this.get('_items'), function(item) {
                return item._isActive;
            });
        },
        
        getActiveItemsCount: function() {
            return this.getActiveItems().length;
        },
        
        getActiveItemsIndexes: function() {
            var indexes = [];
            var items = this.get('_items');
            
            for (var i = 0, l = items.length; i < l; i++)
                if (items[i]._isActive) indexes.push(i); 

            return indexes;
        },

        setItemAtIndexAsActive: function(index, trigger) {
            var items = this.get('_items');
            var item = items[index];
            
            if (item === undefined) return false;

            item._isActive = true;
            if (trigger !== false) this.trigger('change:_items:_isActive', this, items);
            return item;
        },
        
        setItemAtIndexAsInactive: function(index, trigger) {
            var items = this.get('_items');
            var item = items[index];
            
            if (item === undefined) return false;

            item._isActive = false;
            if (trigger !== false) this.trigger('change:_items:_isActive', this, items);
            return item;
        }

    });

    return ItemsModel;

});

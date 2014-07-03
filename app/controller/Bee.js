Ext.define('BeeApp.controller.Bee', {
    extend: 'Ext.app.Controller',

    views: ['Mainview', 'Cellwindow'],
    stores: ['Currentstate'],
    models: ['Currentstate'],

    init: function() {
        this.control({
            'viewport > mainview': {
                itemdblclick: this._showWindow
            }
        });
    },

    _showWindow: function() {
        var win = new BeeApp.view.Cellwindow();
        win.show();
    }

});
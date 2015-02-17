Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    requires: [
        'Ext.container.Viewport',
        'Ext.tip.*'
    ],

    name: 'BeeApp',
    appFolder: 'app',
    controllers: ['Bee'],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'mainview'
            }
        });
    }
});


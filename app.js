Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    requires: ['Ext.container.Viewport'],

    name: 'BeeApp',
    appFolder: 'app',
    controllers: ['Bee'],

    launch: function() {
        console.log("sdafsdaf");
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'mainview'
            }
        });
    }
});


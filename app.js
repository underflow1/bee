Ext.Loader.setConfig({
    enabled: true
});

var currentdata = new Object();
currentdata.letter =  Object();
Ext.Ajax.request({
    url: '/currentuser',
    success: function(response) {
        currentdata.login = Ext.decode(response.responseText).data.login;
        currentdata.rights = Ext.decode(Ext.decode(response.responseText).data.rights);
        console.log(currentdata);
    }
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


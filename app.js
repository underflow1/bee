Ext.Loader.setConfig({
    enabled: true
});

var currentdata = new Object();
currentdata.letter = Object();
currentdata.letter.test = 'test';

Ext.Ajax.request({
    url: '/currentuser',
    success: function(response) {
        currentdata.login= Ext.decode(response.responseText).data.login;
        //currentdata.rights = Ext.decode(Ext.decode(response.responseText).data.rights);
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
    controllers: ['Bee', 'Detailcontroller'],

    launch: function() {
        var tabs = new Ext.TabPanel({
            title: "<table width='100%'><tbody><tr ><td><strong><font style='font-size: 10pt;' color='white'>Список всех номеров на текущий момент</font></strong></td><td><div align='right'><strong><font style='font-size: 10pt;'color='white'>" + currentdata.login + "</font></strong></div></td></tr></tbody></table>",
            items: [{
                xtype: 'mainview',
                title: 'список сим карт'
            },{
                xtype: 'detailview',
                title: 'детализация'
            }]
        });

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [tabs]
        });
    }
});


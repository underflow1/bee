/**
 * Created by kharlamov.a on 20.02.2015.
 */
Ext.define('BeeApp.view.Detailsettings' ,{
    extend: 'Ext.panel.Panel',
    alias: 'widget.detailsettings',
    id: 'detailsettings_id',
    layout: 'hbox',
    items: [{
        xtype: 'fieldset',
        title: 'выбор типа',
        defaultType: 'radio', // each item will be a radio button
        layout: 'hbox',
        height : 65,
        width: 250,
        items: [
            {
                boxLabel: 'по номерам',
                name: 'type',
                inputValue: 'phonenumber'
            },{
                checked: true,
                boxLabel: 'по ФИО',
                name: 'type',
                inputValue: 'fio',
                listeners: {
                    change: function(a,b) {
                        if(b) {
                           // var mystore = Ext.StoreMgr.lookup("").get
                            Ext.getStore('Detailitemstore').load({url:'/detailitemslist/fio'});
                        } else {
                            Ext.getStore('Detailitemstore').load({url:'/detailitemslist/phonenumber'});
                        }
                    }
                }
            }]
    },{
        xtype: 'textfield',
        value: 'asdf',
        id: 'detailphonenumber_id'
    },{
        xtype: 'textfield',
        value: 'asdf',
        id: 'detaildisplaydata_id'
    },{
        xtype: 'textfield',
        value: 'asdf',
        id: 'detailstartdate_id'
    },{
        xtype: 'textfield',
        value: 'asdf',
        id: 'detailstopdate_id'
    }],





    initComponent: function() {

        this.callParent(arguments);
    }
});
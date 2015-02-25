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
        layout: 'vbox',
        //height : 85,
        margin: "5 5 5 5",
        //width: 150,
        items: [
            {
              //  margin: "5 5 5 5",
                boxLabel: 'по номерам',
                name: 'type',
                inputValue: 'phonenumber'
            },{
            //    margin: "5 5 5 5",
                checked: true,
                boxLabel: 'по ФИО',
                name: 'type',
                inputValue: 'fio',
                listeners: {
                    change: function(a,b) {
                        if(b) {
                            Ext.getStore('Detailitemstore').load({url:'/detailitemslist/fio'});
                        } else {
                            Ext.getStore('Detailitemstore').load({url:'/detailitemslist/phonenumber'});
                        }
                    }
                }
            }]
    },{
        xtype: 'fieldset',
        title: 'текущая информация',
        margin: "5 5 5 5",
        //layout: 'vbox',
        width: 300,
        defaults :{
            anchor: '100%',
            //labelWidth: 110,
            readOnly: true
        },
        defaultType: 'textfield',
        items: [{
            text: 'Текущий номер',
            id: 'detailphonenumber_id'
        },{
            xtype: 'textfield',
            id: 'detaildisplaydata_id'
        }]
    },{
        xtype: 'fieldset',
        title: 'выбранный интервал',
        margin: "5 5 5 5",
        layout: 'vbox',
        items: [{
            xtype: 'datefield',
            fieldlabel: 'Описание',
            format: 'Y-m-d',
            id: 'datedetailstartdate_id',
            listeners: {
                select: function(a) {
                    currentdata.mincalldate.date = a.rawValue;
                    console.log(a.rawValue)
                }
            }
        },{
            xtype: 'datefield',
            format: 'Y-m-d',
            id: 'datedetailstopdate_id'
        }]
    },{
        margin: "14 5 10 5",
        xtype: 'button',
        text: 'вывести детализацию'

    }],


    initComponent: function() {

        this.callParent(arguments);
    }
});
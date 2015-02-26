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
        defaultType: 'radio',
        layout: 'vbox',
        margin: "5 5 5 5",
        items: [
            {
                boxLabel: 'по номерам',
                name: 'type',
                inputValue: 'phonenumber',
                id: 'phonetyperadio_id'
            },{
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
        width: 300,
        defaults :{
            anchor: '100%',
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
            id: 'datedetailstartdate_id'
            /*listeners: {
                select: function(a) {
                    currentdata.mincalldate.date = a.rawValue;
                    console.log(a.rawValue)
                }
            }*/
        },{
            xtype: 'datefield',
            format: 'Y-m-d',
            id: 'datedetailstopdate_id'
        }]
    },{
        xtype: 'fieldset',
        title: 'выводить:',
        margin: "5 5 5 5",
        layout: 'vbox',
        defaultType: 'checkbox',
        items: [{
            boxLabel: 'вызовы с нулевой стоимостью',
            checked: true,
            id: 'zeropaysizecheckbox_id',
            listeners: {
                change: function(a) {
                    Ext.getCmp('gprscheckbox_id').setDisabled(!a.checked);
                    console.log(a.checked + ' второй чек: ' + Ext.getCmp('gprscheckbox_id').checked);
                }
            }
        },{
            boxLabel: 'GPRS трафик',
            id: 'gprscheckbox_id'
        }]
    },{
        margin: "14 5 10 5",
        xtype: 'button',
        text: 'вывести детализацию',
        action: 'getdetaildata'

    }],


    initComponent: function() {

        this.callParent(arguments);
    }
});
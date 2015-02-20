/**
 * Created by kharlamov.a on 15.01.2015.
 */
Ext.define('BeeApp.view.Windowcell', {
        extend: 'Ext.window.Window',
        alias: 'widget.windowcell',
        id: 'windowcell',
        itemID: 'windowcell',
        width : 500,
        title: 'Действия с сим картой',
        modal: true,
        border: false,
        resizable: false,
        items: [{
            xtype: 'form',
            bodyPadding: 10,
            defaults :{
                anchor: '100%',
                labelWidth: 110,
                readOnly: true
            },
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'номер',
                name: 'phonenumber'
            },{
                fieldLabel: 'симкарта',
                name: 'simnumber'
            },{
                fieldLabel: 'тариф',
                name: 'tariff'
            },{
                fieldLabel: 'Владелец',
                name: 'fio',
                id: 'fiotextfield'
            },{
                fieldLabel: 'Должность',
                name: 'position'
            },{
                fieldLabel: 'заблокирована',
                name: 'blocked'
            },{
                fieldLabel: 'договор',
                name: 'contract'
            },{
                fieldLabel: 'Компания',
                name: 'companyname'
            }]
        },{
            xtype: 'panel',
            layout:'hbox',
            buttons: [{
                xtype: 'checkboxfield',
                boxLabel: 'письмо',
                checked: true,
                id: 'lettercheckbox',
                listeners: {
                    change: function (v) {
                        currentdata.sendletter = v.checked;
                        console.log(currentdata);
                    },
                    render: function(v) {
                        currentdata.sendletter = v.checked;
                    }
                }
            },{
                text: 'накладная',
                scope: this,
                action: 'nakl'
            },{
                text: 'Приложение',
                scope: this,
                action: 'pril'
            },{
                text: 'Перевыпуск',
                scope: this,
                action: 'showchangesim'
            }]
        }],
        buttons: [{
            text: 'Возврат',
            scope: this,
            action: 'return',
            itemID: 'block_hide'
        },{
            text: 'Выдать',
            scope: this,
            action: 'showgive',
            itemID: 'block_show'
        },{
            text: 'Передать',
            scope: this,
            action: 'showtransfer',
            itemID: 'block_hide'
        },{
            text: 'Сменить ТП',
            scope: this,
            action: 'showchangeplan',
            itemID: 'block_hide'
        },{
            text: 'Блокировать',
            scope: this,
            action: 'block',
            id: 'blockbutton',
            itemID: 'block_button'
        }],

        initComponent: function() {
            this.callParent(arguments);
        }
    }
)

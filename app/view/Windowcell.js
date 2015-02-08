/**
 * Created by kharlamov.a on 15.01.2015.
 */
Ext.define('BeeApp.view.Windowcell', {
        extend: 'Ext.window.Window',
        alias: 'widget.windowcell',
        id: 'windowcell',
        itemID: 'windowcell',
        width : 450,
        title: 'Действия с сим картой',
        modal: true,
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
                name: 'fio'
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
            text: 'Перевыпуск',
            scope: this,
            action: 'showchangesim'
        },{
            text: 'Сменить ТП',
            scope: this,
            action: 'showchangeplan',
            itemID: 'block_hide'
        }],

        initComponent: function() {
            this.callParent(arguments);
        }
    }
)

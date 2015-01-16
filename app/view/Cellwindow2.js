/**
 * Created by kharlamov.a on 15.01.2015.
 */
Ext.define('BeeApp.view.Cellwindow2', {
        extend: 'Ext.window.Window',
        alias: 'widget.cellwindow2',
        width : 400,
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
            action: 'return'
        },{
            text: 'Перевыпуск',
            scope: this,
            action: 'clear'
        },{
            text: 'Сменить ТП',
            scope: this,
            action: 'clear'}],

        initComponent: function() {
            this.callParent(arguments);
        }
    }
)

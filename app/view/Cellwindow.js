Ext.define('BeeApp.view.Cellwindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.cellwindow',
    title: 'Действия с сим картой',
    layout: 'fit',
    width : 400,
    autoShow: true,
    modal: true,

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            border: false,
            bodyPadding: 10,
            defaultType: 'textfield',
            defaults :{
                anchor: '100%',
                labelWidth: 110,
                readOnly: true
            },
            items: [{
                fieldLabel: 'номер',
                id: 'form-phonenumber'
            },{
                fieldLabel: 'симкарта',
                id: 'form-simnumber'
            },{
                fieldLabel: 'тариф',
                id: 'form-tariff'
            },{
                fieldLabel: 'Владелец',
                id: 'form-fio'
            },{
                fieldLabel: 'Должность',
                id: 'form-position'
            },{
                fieldLabel: 'договор',
                id: 'form-contract'
            },{
                fieldLabel: 'Компания',
                id: 'form-companyname'
            }]
        }];
        this.buttons = [{
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
            action: 'clear'
        }];

        this.callParent(arguments);
    }
});
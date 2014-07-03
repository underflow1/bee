Ext.define('BeeApp.view.Cellwindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.cellwindow',
    title: 'Действия с сим картой',
    layout: 'fit',
    width : 400,
    height: 400,
    autoShow: true,
    modal: true,

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            items: [{   xtype: 'textfield',
                fieldLabel: 'номер',
                name: 'phonenumber',
                id: 'form-phonenumber'
            },{
                xtype: 'textfield',
                name: 'fio',
                fieldLabel: 'Владелец',
                width: 350,
                id: 'form-fio'
            },{
                xtype: 'textfield',
                fieldLabel: 'договор',
                name: 'contract',
                id: 'form-contract'
            }]
        }];
        this.dockedItems=[{
            xtype:'toolbar',
            docked: 'top',
            items: [{
                text:'Выдать',
                iconCls:'new-icon',
                action: 'new'
            },{
                text:'Сохранить',
                iconCls:'save-icon',
                action: 'save'
            },{
                text:'Возврат',
                iconCls:'delete-icon',
                action: 'delete'
            }]
        }];
        this.buttons = [{
            text: 'Очистить',
            scope: this,
            action: 'clear'
        }];

        this.callParent(arguments);
    }
});
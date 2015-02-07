/**
 * Created by underflow on 07.02.2015.
 */
Ext.define('BeeApp.view.Windowtransfer', {
        extend: 'Ext.window.Window',
        alias: 'widget.windowtransfer',
        width : 400,
        title: 'Передать сим карту',
        modal: true,
        items: [{
            //'/testsim/{phonenumber}/givethenumber/{tariff}/{fio}/{position}/{deduction}/{pkg}/{roam}'
            xtype: 'form',
            bodyPadding: 10,
            defaults :{
                allowBlank: false,
                anchor: '100%',
                labelWidth: 110
            },
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'номер',
                name: 'phonenumber',
                readOnly: true
            },{
                fieldLabel: 'ФИО',
                name: 'fio',
                readOnly: false
            },{
                fieldLabel: 'должность',
                name: 'position',
                readOnly: false
            }]
        }],
        buttons: [{
            text: 'передать!',
            scope: this,
            action: 'transferthenumber'
        }],

        initComponent: function() {
            this.callParent(arguments);
        }
    }
)
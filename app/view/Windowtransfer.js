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
            },{
                fieldLabel: 'назначение',
                xtype: 'combobox',
                editable: false,
                store: new Ext.data.SimpleStore({
                    fields: [
                        'id',
                        'purpose'
                    ],
                    data:purpose
                }),
                name: 'purpose',
                valueField: 'purpose',
                displayField:'purpose',
                queryMode:'local',
                readOnly: false
            },{
                fieldLabel: 'договор',
                name: 'truddognumber',
                readOnly: false
            },{
                xtype: 'datefield',
                format: 'Y-m-d',
                fieldLabel: 'дата договора',
                name: 'truddogdate',
                readOnly: false,
                value: new Date()
            },{
                fieldLabel: 'Компания',
                name: 'truddogcompanyid',
                readOnly: false,
                xtype: 'combobox',
                editable: false,
                store: 'Companystore',
                valueField: 'id',
                displayField:'truddogcompanyname'
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
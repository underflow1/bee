/**
 * Created by underflow on 07.02.2015.
 */

var purpose = [
    [1, 'связь'],
    [2, 'на отдел'],
    [3, 'интернет']
];

Ext.define('BeeApp.view.Windowtransfer', {
        extend: 'Ext.window.Window',
        alias: 'widget.windowtransfer',
        width : 600,
        title: 'Передать сим карту',
        modal: true,
        alias: 'widget.windowtransfer',
        items: [{
            xtype: 'form',
            bodyPadding: 10,
            defaults :{
                allowBlank: false,
                anchor: '100%',
                labelWidth: 100
            },
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'номер',
                name: 'phonenumber',
                readOnly: true
            },{
                xtype: 'combobox',
                fieldLabel: 'ФИО',
                name: 'fio',
                readOnly: false,
                store: 'Zupdata',
                valueField: 'fio',
                displayField:'fio',
                typeAhead: true,
                queryMode: 'local',
                hideTrigger:false,
                minChars: 3,
                listeners: {
                    select: function(a,b){
                        Ext.getCmp('trasferpositionfield').setValue(b[0].get('position'));
                        Ext.getCmp('trasfertruddognumberfield').setValue(b[0].get('truddognumber'));
                        Ext.getCmp('trasfertruddogdatefield').setValue(b[0].get('truddogdate'));
                        var index = Ext.StoreMgr.lookup("Companystore").findRecord('id',b[0].get('companycode'));
                        Ext.getCmp('trasfertruddogcompanyidfield').setValue(index);
                    }
                },
                listConfig: {
                    loadingText: 'Searching...',
                    emptyText: 'No matching posts found.',
                    getInnerTpl: function () {
                        return '<div>' +
                        '<b>{fio}</b> <br>' +
                        '{position}' +
                        '</div>';
  //                      '</tpl>'
                    }
                }
            },{
                fieldLabel: 'должность',
                id: 'trasferpositionfield',
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
                id: 'trasfertruddognumberfield',
                name: 'truddognumber',
                readOnly: false
            },{
                xtype: 'datefield',
                id: 'trasfertruddogdatefield',
                format: 'Y-m-d',
                fieldLabel: 'дата договора',
                name: 'truddogdate',
                readOnly: false,
                value: new Date()
            },{
                fieldLabel: 'Компания',
                id: 'trasfertruddogcompanyidfield',
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
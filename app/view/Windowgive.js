/**
 * Created by underflow on 07.02.2015.
 */
var purpose = [
    [1, 'связь'],
    [2, 'на отдел'],
    [3, 'интернет']
];

    Ext.define('BeeApp.view.Windowgive', {
        extend: 'Ext.window.Window',
        alias: 'widget.windowgive',
        width : 600,
        title: 'выдать сим карту',
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
                        Ext.getCmp('givepositionfield').setValue(b[0].get('position'));
                        Ext.getCmp('givetruddognumberfield').setValue(b[0].get('truddognumber'));
                        Ext.getCmp('givetruddogdatefield').setValue(b[0].get('truddogdate'));
                        var index = Ext.StoreMgr.lookup("Companystore").findRecord('id',b[0].get('companycode'));
                        Ext.getCmp('givetruddogcompanyidfield').setValue(index);
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
                id: 'givepositionfield',
                name: 'position',
                readOnly: false
            },{
                name: 'tariffid',
                xtype: 'combobox',
                editable: false,
                store: 'Tariffstore',
                fieldLabel: 'ТП',
                valueField: 'id',
                displayField:'internalname',
                queryMode:'local'
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
                readOnly: false,
                value: 'связь'
            },{
                fieldLabel: 'удержание',
                name: 'deduction',
                readOnly: true,
                value: 0
            },{
                fieldLabel: 'пакет',
                name: 'pkg',
                readOnly: true,
                value: 0
            },{
                fieldLabel: 'роуминг',
                name: 'roam',
                readOnly: true,
                value: 0
            },{
                fieldLabel: 'договор',
                id: 'givetruddognumberfield',
                name: 'truddognumber',
                readOnly: false
            },{
                xtype: 'datefield',
                id: 'givetruddogdatefield',
                format: 'Y-m-d',
                fieldLabel: 'дата договора',
                name: 'truddogdate',
                readOnly: false,
                value: new Date()
            },{
                fieldLabel: 'Компания',
                id: 'givetruddogcompanyidfield',
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
            text: 'выдать!',
            scope: this,
            action: 'givethenumber'
        }],

        initComponent: function() {
            this.callParent(arguments);
        }
    }
)

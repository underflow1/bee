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
        width : 400,
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
                name: 'tariffid',
                xtype: 'combobox',
                editable: false,
                store: 'Tariffstore',
                fieldLabel: 'ТП',
                valueField: 'id',
                displayField:'internalname',
                queryMode:'local'
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
            text: 'выдать!',
            scope: this,
            action: 'givethenumber'
        }],

        initComponent: function() {
            this.callParent(arguments);
        }
    }
)

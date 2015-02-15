/**
 * Created by underflow on 07.02.2015.
 */
var plans = [
    [1, 'Интрасеть (Национальный ВИП (фед.))'],
    [2, 'Привилегированный (Привилегированный (фед))'],
    [3, 'Престижный (ВдБ Золото 1000 1.0 (фед))'],
    [4, 'Специальный+ (Специальный+ (фед))']
];
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
                name: 'tariff',
                xtype: 'combobox',
                store: new Ext.data.SimpleStore({
                    fields:
                        [
                            'id',   //числовое значение - номер элемента
                            'name' //текст
                        ],
                    data:plans
                }),
                fieldLabel: 'ТП',
                valueField: 'name',
                displayField:'name',
                queryMode:'local'
            },{
                fieldLabel: 'ФИО',
                name: 'fio',
                readOnly: false
            },{
                fieldLabel: 'должность',
                name: 'position',
                readOnly: false
            },,{
                fieldLabel: 'назначение',
                xtype: 'combobox',
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
                value: 0
            },{
                fieldLabel: 'удержание',
                name: 'deduction',
                readOnly: false,
                value: 0
            },{
                fieldLabel: 'пакет',
                name: 'pkg',
                readOnly: false,
                value: 0
            },{
                fieldLabel: 'роуминг',
                name: 'roam',
                readOnly: false,
                value: 0
            },{
                fieldLabel: 'договор',
                name: 'truddognumber',
                readOnly: false,
                value: 0
            },{
                xtype: 'datefield',
                format: 'Y-m-d',
                fieldLabel: 'дата договора',
                name: 'truddogdate',
                readOnly: false,
                value: 0
            },{
                fieldLabel: 'Компания',
                name: 'truddogcompany',
                readOnly: false,
                xtype: 'combobox',
                store: 'Companystore',
                valueField: 'id',
                displayField:'companyname'
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

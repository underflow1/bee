/**
 * Created by underflow on 07.02.2015.
 */
var plans = [
    [1, 'Интрасеть'],
    [2, 'Привилегированный'],
    [3, 'Престижный'],
    [4, 'Специальный+']
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

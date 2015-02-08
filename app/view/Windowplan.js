/**
 * Created by kharlamov.a on 04.02.2015.
 */
var plans = [
    [1, 'Интрасеть'],
    [2, 'Привилегированный'],
    [3, 'Престижный'],
    [4, 'Специальный+']
];

Ext.define('BeeApp.view.Windowplan', {
        extend: 'Ext.window.Window',
        alias: 'widget.windowplan',
        width : 400,
        title: 'смена тарифа',
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
                name: 'plan',
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
                //forceSelection: true,
                //editable: 'false',
                //readOnly: 'true',
                queryMode:'local'
            }]
        }],
        buttons: [{
            text: 'Сменить!',
            scope: this,
            action: 'changeplan'
        }],

        initComponent: function() {
            this.callParent(arguments);
        }
    }
)

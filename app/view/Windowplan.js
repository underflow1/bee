/**
 * Created by kharlamov.a on 04.02.2015.
 */
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
                name: 'tariffid',
                xtype: 'combobox',
                editable: false,
                store: 'Tariffstore',
                fieldLabel: 'ТП',
                valueField: 'id',
                displayField:'internalname',
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

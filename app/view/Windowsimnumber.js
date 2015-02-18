/**
 * Created by kharlamov.a on 15.01.2015.
 */

var passNumberVType = {
    passNumber: function(val, field){
        var passNumberRegex = /^\d{18}$/;
        return passNumberRegex.test(val);
    },
    passNumberText: 'номер сим карты состоит из 18 цифр',
    passNumberMask: /[\d]/
};
Ext.apply(Ext.form.field.VTypes, passNumberVType);

Ext.define('BeeApp.view.Windowsimnumber', {
        extend: 'Ext.window.Window',
        alias: 'widget.windowsimnumber',
        width : 400,
        title: 'замена болванки',
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
                fieldLabel: 'симкарта',
                name: 'simnumber',
                vtype: 'passNumber'
            }]
        }],
        buttons: [{
            text: 'Перевыпуск!',
            scope: this,
            action: 'changesim'
        }],

        initComponent: function() {
            this.callParent(arguments);
        }
    }
)




/**
 * Created by kharlamov.a on 21.01.2015.
 */

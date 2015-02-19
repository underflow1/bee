/**
 * Created by underflow on 07.02.2015.
 */
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
                id: 'trasferfiocombobox',
                fieldLabel: 'ФИО',
                name: 'fio',
                readOnly: false,
                store: 'Zupdata',
                valueField: 'fio',
                displayField:'fio',
                typeAhead: true,
                queryMode: 'local',
                hideTrigger:false,
                minchars: 4,
                listConfig: {
                    loadingText: 'Searching...',
                    emptyText: 'No matching posts found.',
                    getInnerTpl: function () {
                        return '' +
                        '<tpl if="fired">' +
                        '<table class="x-field x-table-plain" width="100%"><tbody><tr><td><div><font color = #a9a9a9><b>{fio}</b></font></div></td><td><div align="right"><font color="#a9a9a9">уволен: {[Ext.Date.format(values.firedate, "Y-m-d")]}</font></div></td></tr></tbody></table>' +
                        '<font color = #a9a9a9>{position}</font>' +
                        '<tpl else>' +
                        '<div>' +
                        '<b>{fio}</b> <br>' +
                        '{position}' +
                        '</div>' +
                        '</tpl>'
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
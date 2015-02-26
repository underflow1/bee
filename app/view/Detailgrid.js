/**
 * Created by kharlamov.a on 20.02.2015.
 */
Ext.define('BeeApp.view.Detailgrid' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.detailgrid',
    id: 'detailgrid_id',
    store: 'Detailstore',
    features: [{
        ftype: 'summary'
    }],

    initComponent: function() {
        this.columns = [
            {
                text     : 'абонент',
                dataIndex: 'abonent',
                width: 100
            },{
                text     : 'дата',
                dataIndex: 'calldate',
                width: 100
            },{
                text     : 'время',
                dataIndex: 'calltime',
                width: 100
            },{
                text     : 'длительность',
                dataIndex: 'duration',
                width: 110
            },{
                text     : 'стоимость',
                dataIndex: 'paysize',
                width: 130,
                summaryType: 'sum',
                 summaryRenderer: function(value) {
                    return Ext.String.format('Итого: {0}', Ext.util.Format.number(value, '0.00'));
               }
            },{
                text     : 'инициатор',
                dataIndex: 'initiator',
                width: 100
            },{
                text     : 'получатель',
                dataIndex: 'receiver',
                width: 100
            },{
                text     : 'action_description',
                dataIndex: 'action_description',
                flex: 1
            },{
                text     : 'service_description',
                dataIndex: 'service_description',
                flex: 1
            },{
                text     : 'type',
                dataIndex: 'type',
                flex: 1
            }
        ];

        this.callParent(arguments);
    }
});
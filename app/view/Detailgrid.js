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
                text     : 'abonent',
                dataIndex: 'abonent',
                flex: 1
            },{
                text     : 'calldate',
                dataIndex: 'calldate',
                flex: 1
            },{
                text     : 'calltime',
                dataIndex: 'calltime',
                flex: 1
            },{
                text     : 'duration',
                dataIndex: 'duration',
                flex: 1
            },{
                text     : 'paysize',
                dataIndex: 'paysize',
                flex: 1,
                summaryType: 'sum',
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return Ext.String.format('{0} student{1}', value, value !== 1 ? 's' : '');
                }
            },{
                text     : 'receiver',
                dataIndex: 'receiver',
                flex: 1
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
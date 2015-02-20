/**
 * Created by kharlamov.a on 20.02.2015.
 */
Ext.define('BeeApp.view.Detailitemgrid' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.detailitemgrid',
    id: 'detailitemgrid_id',
    store: 'Detailitemstore',

    viewConfig: {
        getRowClass: function(record) {
            if(record.get('misc') == 'hidden'){
                return 'blocked';
            }
        }
    },

    initComponent: function() {
        this.columns = [
            {
                dataIndex: 'displaydata',
                flex: 1
            }
        ];

        this.callParent(arguments);
    }
});
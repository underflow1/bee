/**
 * Created by kharlamov.a on 20.02.2015.
 */
Ext.define('BeeApp.view.Detailview' ,{
    extend: 'Ext.panel.Panel',
    alias: 'widget.detailview',
    id: 'detailview_id',
    layout: 'border',
    items: [{
        xtype: 'detailgrid',
        region: 'center'
    },{
        xtype: 'detailsettings',
        region: 'north',
        height: 95
    },{
        xtype: 'detailitemgrid',
        region: 'west',
        width: 250
    }]
});
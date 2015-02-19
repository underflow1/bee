/**
 * Created by kharlamov.a on 19.02.2015.
 */
Ext.define('BeeApp.store.Zupdata', {
    extend: 'Ext.data.Store',
    model: 'BeeApp.model.Zupdata',
    autoLoad: true,
    storeId: 'Zupdata',
    proxy:{
        type: 'ajax',
        url: '/sssss',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalCount'
        }
    }
});

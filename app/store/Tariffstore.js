/**
 * Created by kharlamov.a on 04.02.2015.
 */
Ext.define('BeeApp.store.Tariffstore', {
    extend: 'Ext.data.Store',
    model: 'BeeApp.model.Tariffmodel',
    autoLoad: true,
    storeId: 'Tariffstore',
    proxy:{
        type: 'ajax',
        url: '/tariff',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

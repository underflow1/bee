/**
 * Created by kharlamov.a on 12.02.2015.
 */
Ext.define('BeeApp.store.Company', {
    extend: 'Ext.data.Store',
    model: 'BeeApp.model.Company',
    autoLoad: true,
    storeId: 'Company',
    proxy:{
        type: 'ajax',
        url: '/company',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});


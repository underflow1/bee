/**
 * Created by kharlamov.a on 12.02.2015.
 */
Ext.define('BeeApp.store.Companystore', {
    extend: 'Ext.data.Store',
    model: 'BeeApp.model.Companymodel',
    autoLoad: true,
    storeId: 'Companystore',
    proxy:{
        type: 'ajax',
        url: '/company',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});


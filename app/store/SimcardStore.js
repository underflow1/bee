/**
 * Created by kharlamov.a on 23.01.2015.
 */
Ext.define('BeeApp.store.SimcardStore', {
    extend: 'Ext.data.Store',
    model: 'BeeApp.model.SimcardModel',
    autoLoad: true,
    storeId: 'simcardstore',
    proxy:{
        type: 'rest',
        url: '/simcard',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json'
        }
    }
});


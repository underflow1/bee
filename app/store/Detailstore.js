/**
 * Created by underflow on 21.02.2015.
 */
Ext.define('BeeApp.store.Detailstore', {
    extend: 'Ext.data.Store',
    model: 'BeeApp.model.Detailmodel',
    autoLoad: false,
    storeId: 'Detailstore_id',
    proxy:{
        type: 'ajax',
        url: '/detail',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
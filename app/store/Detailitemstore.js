/**
 * Created by kharlamov.a on 20.02.2015.
 */
Ext.define('BeeApp.store.Detailitemstore', {
    extend: 'Ext.data.Store',
    model: 'BeeApp.model.Detailitemmodel',
    autoLoad: true,
    storeId: 'Detailitemstore_id',
    proxy:{
        type: 'ajax',
        url: '/detail/fio',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

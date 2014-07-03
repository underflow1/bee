Ext.define('BeeApp.store.Currentstate', {
    extend: 'Ext.data.Store',
    model: 'BeeApp.model.Currentstate',
    autoLoad: true,
    storeId: 'Currentstate',
    proxy:{
        type: 'ajax',
        url: '/current',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

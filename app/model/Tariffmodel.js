/**
 * Created by kharlamov.a on 16.02.2015.
 */
Ext.define('BeeApp.model.Tariffmodel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'internalname', type: 'string'},
        {name: 'operatorsname', type: 'string'}
    ],
    idProperty: 'id'
});

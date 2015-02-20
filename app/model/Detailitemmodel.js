/**
 * Created by kharlamov.a on 20.02.2015.
 */
Ext.define('BeeApp.model.Detailitemmodel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'misc', type: 'string'},
        {name: 'phonenumber', type: 'string'},
        {name: 'displaydata', type: 'string'},
        {name: 'startdate', type: 'date'},
        {name: 'stopdate', type: 'date'}
    ],
    idProperty: 'id'
});
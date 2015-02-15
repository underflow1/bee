/**
 * Created by underflow on 15.02.2015.
 */
Ext.define('BeeApp.model.Companymodel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'companyname', type: 'string'},
        {name: 'director', type: 'string'},
        {name: 'directorspos', type: 'string'}
    ],
    idProperty: 'id'
});

/**
 * Created by kharlamov.a on 23.01.2015.
 */
Ext.define('BeeApp.model.SimcardModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'integer'},
        {name: 'phonenumber', type: 'string'},
        {name: 'simnumber', type: 'string'},
        {name: 'tariff', type: 'string'},
        {name: 'fio', type: 'string'},
        {name: 'position', type: 'string'},
        {name: 'blocked', type: 'bool'},
        {name: 'contract', type: 'string'},
        {name: 'companyname', type: 'string'},
        {name: 'pkg', type: 'string'},
        {name: 'roam', type: 'bool'}
    ],
    idProperty: 'id'
});

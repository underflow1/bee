Ext.define('BeeApp.model.Currentstate', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'phonenumber', type: 'string'},
        {name: 'simnumber', type: 'string'},
        {name: 'tariff', type: 'string'},
        {name: 'fio', type: 'string'},
        {name: 'position', type: 'string'},
        {name: 'blocked', type: 'bool'},
        {name: 'contract', type: 'string'},
        {name: 'companyname', type: 'string'},
        {name: 'deduction', type: 'string'},
        {name: 'pkg', type: 'string'},
        {name: 'roam', type: 'bool'}
    ],
    idProperty: 'phonenumber'
});
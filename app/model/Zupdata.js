/**
 * Created by kharlamov.a on 19.02.2015.
 */
Ext.define('BeeApp.model.Zupdata', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'fio', type: 'string'},
        {name: 'firedate', type: 'date'},
        {name: 'position', type: 'string'},
        {name: 'fired', type: 'bool'},
        {name: 'truddogdate', type: 'string'},
        {name: 'truddognumber', type: 'integer'},
        {name: 'companycode', type: 'integer'}
    ]
});
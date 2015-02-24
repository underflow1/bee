/**
 * Created by underflow on 21.02.2015.
 */
Ext.define('BeeApp.model.Detailmodel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'abonent', type: 'string'},
        {name: 'calldate', type: 'string'},
        {name: 'calltime', type: 'string'},
        {name: 'duration', type: 'string'},
        {name: 'paysize', type: 'float'},
        {name: 'receiver', type: 'string'},
        {name: 'action_description', type: 'string'},
        {name: 'service_description', type: 'string'},
        {name: 'type', type: 'string'}
    ]
});
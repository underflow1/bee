/**
 * Created by kharlamov.a on 20.02.2015.
 */
Ext.define('BeeApp.view.Detailgrid' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.detailgrid',
    id: 'detailgrid_id',
    store: 'Currentstate',

    initComponent: function() {
        this.columns = [
            {
                text     : 'номер',
                dataIndex: 'phonenumber',
                width: 90
            },{
                text     : 'номер симкарты',
                dataIndex: 'simnumber',
                width: 150
            },{
                text     : 'ТП',
                dataIndex: 'tariff',
                width: 145
            },{
                text     : 'ФИО',
                dataIndex: 'fio',
                width: 280,
                flex: 1
            },{
                text     : 'Должность',
                dataIndex: 'position',
                width: 250,
                flex: 1
            },{
                text     : 'назначение',
                dataIndex: 'purpose',
                width: 100
            },{
                text     : 'Компания',
                dataIndex: 'companyname',
                //width: 200,
                flex: 1
            }

        ];

        this.callParent(arguments);
    }
});
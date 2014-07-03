Ext.define('BeeApp.view.Mainview' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.mainview',
    store: 'Currentstate',
    height: 900,
    width: 1245,
    title: 'Список всех номеров на текущий момент',

    initComponent: function() {
        this.columns = [
            {
                text     : 'номер',
                dataIndex: 'phonenumber',
                width: 80
            },{
                text     : 'номер симкарты',
                dataIndex: 'simnumber',
                width: 125
            },
            {
                text     : 'ТП',
                dataIndex: 'tariff',
                width: 30
            },
            {
                text     : 'ФИО',
                dataIndex: 'fio',
                width: 250
            },{
                text     : 'Должность',
                dataIndex: 'position',
                width: 250
            },{
                text     : 'блок',
                dataIndex: 'dtfblck',
                width: 70
            },{
                text     : 'Договор',
                dataIndex: 'contract',
                width: 70
            },{
                text     : 'Компания',
                dataIndex: 'companyname',
                width: 200
            },{
                text     : 'уд',
                dataIndex: 'deduction',
                width: 50
            },{
                text     : 'трф',
                dataIndex: 'pkg',
                width: 30
            },
            {
                text     : 'рм',
                dataIndex: 'dtfrm',
                width: 70
            }
        ];

        this.callParent(arguments);
    }
});

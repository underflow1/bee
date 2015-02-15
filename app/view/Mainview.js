Ext.define('BeeApp.view.Mainview' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.mainview',
    id: 'mainviewgrid_id',
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
                width: 125
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
                text     : 'назначение',
                dataIndex: 'purpose',
                width: 125
            },{
                xtype: 'checkcolumn',
                disabled : true,
                disabledCls : 'x-item-enabled',
                text     : 'блок',
                dataIndex: 'blocked',
                width: 50
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
                text     : 'пакет',
                dataIndex: 'pkg',
                width: 50
            },
            {
                xtype: 'checkcolumn',
                disabled : true,
                disabledCls : 'x-item-enabled',
                text     : 'роум',
                dataIndex: 'roam',
                width: 50
            }
        ];

        this.callParent(arguments);
        console.log('mainview');
    }
});

Ext.define('BeeApp.view.Mainview' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.mainview',
    id: 'mainviewgrid_id',
    store: 'Currentstate',
    //height: 900,
    //width: 1245,
    title: "<table width='100%'><tbody><tr ><td><strong><font style='font-size: 10pt;' color='white'>Список всех номеров на текущий момент</font></strong></td><td><div align='right'><strong><font style='font-size: 10pt;'color='white'>" + currentdata.login + "</font></strong></div></td></tr></tbody></table>",
    viewConfig: {
        getRowClass: function(record) {
            if(record.get('blocked')){
                return 'blocked';
            }
        }
    },
    //features: [Ext.create('Ext.grid.feature.Grouping', {groupHeaderTpl: 'Группа  {name}'})],

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
            },
            {
                text     : 'ТП',
                dataIndex: 'tariff',
                width: 145
            },{
                text     : 'ФИО',
                dataIndex: 'fio',
                width: 280
            },{
                text     : 'Должность',
                dataIndex: 'position',
                width: 250
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
            /*,{
             xtype: 'checkcolumn',
             disabled : true,
             disabledCls : 'x-item-enabled',
             text     : 'блок',
             dataIndex: 'blocked',
             width: 50
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
            } */
        ];

        this.callParent(arguments);
    }
});

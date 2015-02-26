/**
 * Created by kharlamov.a on 20.02.2015.
 */
Ext.define('BeeApp.view.Detailitemgrid' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.detailitemgrid',
    id: 'detailitemgrid_id',
    store: 'Detailitemstore',

    viewConfig: {
        getRowClass: function(record) {
            if(record.get('misc') == 'hidden'){
                return 'blocked';
            }
        }
    },
    listeners:{
        itemclick: function(grid, record) {
            $start = record.raw.startdate;
            $stop = record.raw.stopdate;
            if (new Date($start) > new Date($stop)) {
                $start = $stop;
            }
            Ext.getCmp('detailphonenumber_id').setValue(record.raw.phonenumber);
            if (record.raw.displaydata == record.raw.phonenumber) {
                Ext.getCmp('detaildisplaydata_id').setValue('Без учета держателя');
            } else {
                Ext.getCmp('detaildisplaydata_id').setValue(record.raw.displaydata)
            }

            Ext.getCmp('datedetailstartdate_id').setMinValue(new Date($start));
            Ext.getCmp('datedetailstartdate_id').setMaxValue(new Date($stop));
            Ext.getCmp('datedetailstopdate_id').setMinValue(new Date($start));
            Ext.getCmp('datedetailstopdate_id').setMaxValue(new Date($stop));

            if ($start == $stop) {
                Ext.getCmp('datedetailstartdate_id').setValue($start);
            } else {
                if (Ext.Date.add(new Date($stop), Ext.Date.MONTH, -1) < new Date($start)) {
                    Ext.getCmp('datedetailstartdate_id').setValue($start);
                } else {
                    Ext.getCmp('datedetailstartdate_id').setValue(Ext.Date.add(new Date($stop), Ext.Date.MONTH, -1));
                }
            }

            Ext.getCmp('datedetailstopdate_id').setValue($stop);
        }

    },

    initComponent: function() {
        this.columns = [
            {
                dataIndex: 'displaydata',
                flex: 1
            }
        ];

        this.callParent(arguments);
    }
});
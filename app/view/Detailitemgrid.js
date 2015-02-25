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
            if (record.raw.phonenumber == record.raw.displaydata) {
                Ext.getCmp('detaildisplaydata_id').setValue('держатель не учитывается');
                Ext.getCmp('datedetailstartdate_id').minValue = new Date(currentdata.mincalldate.date);
                Ext.getCmp('datedetailstartdate_id').maxValue = new Date(currentdata.maxcalldate.date);
                Ext.getCmp('datedetailstartdate_id').setValue(new Date(currentdata.mincalldate.date));
                Ext.getCmp('datedetailstopdate_id').minValue = new Date(currentdata.mincalldate.date);
                Ext.getCmp('datedetailstopdate_id').maxValue = new Date(currentdata.maxcalldate.date);
                Ext.getCmp('datedetailstopdate_id').setValue(new Date(currentdata.maxcalldate.date));
            } else {
                Ext.getCmp('datedetailstartdate_id').minValue = new Date(record.raw.startdate);
                Ext.getCmp('datedetailstartdate_id').maxValue = new Date(record.raw.stopdate);
                Ext.getCmp('datedetailstartdate_id').setValue(new Date(currentdata.mincalldate.date));
                Ext.getCmp('datedetailstopdate_id').minValue = new Date(record.raw.startdate);
                Ext.getCmp('datedetailstopdate_id').maxValue = new Date(record.raw.stopdate);
                Ext.getCmp('datedetailstopdate_id').setValue(new Date(currentdata.maxcalldate.date));

                Ext.getCmp('detaildisplaydata_id').setValue(record.raw.displaydata);

                $spordate = Ext.Date.add(new Date(record.raw.stopdate), Ext.Date.MONTH, -1);
                if ($spordate < record.raw.startdate) {
                    Ext.getCmp('datedetailstartdate_id').setValue($spordate);
                } else {
                    Ext.getCmp('datedetailstartdate_id').setValue(record.raw.startdate);
                }

                Ext.getCmp('datedetailstopdate_id').setValue(new Date(record.raw.stopdate));
                //console.log('/detail/'+record.raw.phonenumber+'/'+record.raw.startdate+'/'+record.raw.stopdate);
            }
            Ext.getCmp('detailphonenumber_id').setValue(record.raw.phonenumber);
        },
        itemdblclick: function(grid, record) {
            //if (record.raw.phonenumber == record.raw.displaydata) {
                console.log('/detail/'+record.raw.phonenumber+'/' + Ext.getCmp('datedetailstartdate_id').rawValue + '/' + Ext.getCmp('datedetailstopdate_id').rawValue);
                Ext.getStore('Detailstore').load({url:'/detail/'+record.raw.phonenumber+'/' + Ext.getCmp('datedetailstartdate_id').rawValue + '/' + Ext.getCmp('datedetailstopdate_id').rawValue});
         //   } else {
        //        Ext.getStore('Detailstore').load({url:'/detail/'+record.raw.phonenumber+'/'+record.raw.startdate+'/'+record.raw.stopdate});
        //    }
         //   Ext.getCmp('detailphonenumber_id').setValue(record.raw.phonenumber);
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
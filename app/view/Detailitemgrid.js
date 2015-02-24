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
    listeners: {
        itemclick: function(grid, record) {

            if (record.raw.phonenumber == record.raw.displaydata) {
                Ext.getCmp('detaildisplaydata_id').setValue('все владельцы');
                Ext.getCmp('detailstartdate_id').setValue('2014-01-01');
                Ext.getCmp('detailstopdate_id').setValue(Ext.Date.format(new Date(), 'Y-m-d'));
                Ext.getStore('Detailstore').load({url:'/detail/'+record.raw.phonenumber+'/2014-01-01/2014-02-01'});
                console.log('/detail/'+record.raw.phonenumber+'/2014-01-01/2014-02-01');
                //Ext.getCmp('Detailstore_id').load({url:'/detail/'+record.raw.phonenumber+'/2014-01-01/2014-02-01'});
            } else {
                Ext.getCmp('detaildisplaydata_id').setValue(record.raw.displaydata);
                Ext.getCmp('detailstartdate_id').setValue(record.raw.startdate);
                Ext.getCmp('detailstopdate_id').setValue(record.raw.stopdate);

                Ext.getStore('Detailstore').load({url:'/detail/'+record.raw.phonenumber+'/'+record.raw.startdate+'/'+record.raw.stopdate});
                console.log('/detail/'+record.raw.phonenumber+'/'+record.raw.startdate+'/'+record.raw.stopdate);
                //Ext.getCmp('Detailstore_id').load({url:'/detail/'+record.raw.phonenumber+'/record.raw.startdate/record.raw.stopdate'});
            }

            Ext.getCmp('detailphonenumber_id').setValue(record.raw.phonenumber);
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
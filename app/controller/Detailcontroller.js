/**
 * Created by kharlamov.a on 20.02.2015.
 */
Ext.define('BeeApp.controller.Detailcontroller', {
    extend: 'Ext.app.Controller',

    views: ['Detailview', 'Detailgrid', 'Detailitemgrid', 'Detailsettings'],
    stores: ['Currentstate', 'Detailitemstore', 'Detailstore'],
    models: ['Currentstate', 'Detailitemmodel', 'Detailmodel'],

    init: function() {
        this.control({


        });
    },

    _detailitemgridClick: function(grid, record) {
        //view = Ext.getCmp('detailobject_id').setValue(record.raw.displaydata);
        //Ext.getCmp('detailstartdate_id').setValue(record.raw.startdate);
        //Ext.getCmp('detailstopdate_id').setValue(record.raw.stopdate);
        //console.log(record);
      //  view = Ext.getCmp('detailobject_id').setValue(record.raw.displaydata);
        //view.query('textfield[itemID=detailsibject]').forEach(function(textfields){textfields.setValue(record.raw.item)});
        //console.log(view);

    }

});

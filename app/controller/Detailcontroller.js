/**
 * Created by kharlamov.a on 20.02.2015.
 */
Ext.define('BeeApp.controller.Detailcontroller', {
    extend: 'Ext.app.Controller',

    views: ['Detailview', 'Detailgrid', 'Detailitemgrid', 'Detailsettings'],
    stores: ['Currentstate', 'Detailitemstore'],
    models: ['Currentstate', 'Detailitemmodel'],

    init: function() {
        this.control({
            'detailitemgrid': {
            itemclick: this._detailitemgridClick
            }

        });
    },

    _detailitemgridClick: function(grid, record) {
        //console.log(record);
        view = Ext.getCmp('detailobject_id').setValue(record.raw.displaydata);
        //view.query('textfield[itemID=detailsibject]').forEach(function(textfields){textfields.setValue(record.raw.item)});
        console.log(view);

    }

});

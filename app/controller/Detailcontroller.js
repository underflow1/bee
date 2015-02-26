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
            'button[action=getdetaildata]': {
                click: this._getDetailDataButtonClick
            }


        });
    },

    _getDetailDataButtonClick: function() {
        console.log('/detail/'+ Ext.getCmp('detailphonenumber_id') + '/' + Ext.getCmp('datedetailstartdate_id').rawValue + '/' + Ext.getCmp('datedetailstopdate_id').rawValue);
        Ext.getStore('Detailstore').load({url:'/detail/' + Ext.getCmp('detailphonenumber_id').value + '/' + Ext.getCmp('datedetailstartdate_id').rawValue + '/' + Ext.getCmp('datedetailstopdate_id').rawValue});
    }

});

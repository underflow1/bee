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
        if (!Ext.isDefined(Ext.getCmp('detailphonenumber_id').value)) {
            Ext.Msg.alert('Ошибка', 'Ничего не выбрано');
        } else {
            console.log('/detail/'+ Ext.getCmp('detailphonenumber_id').value + '/' + Ext.getCmp('datedetailstartdate_id').rawValue + '/' + Ext.getCmp('datedetailstopdate_id').rawValue + '/' + Ext.getCmp('zeropaysizecheckbox_id').checked+ '/' + Ext.getCmp('gprscheckbox_id').checked);
            Ext.getStore('Detailstore').load({url:'/detail/'+ Ext.getCmp('detailphonenumber_id').value + '/' + Ext.getCmp('datedetailstartdate_id').rawValue + '/' + Ext.getCmp('datedetailstopdate_id').rawValue + '/' + Ext.getCmp('zeropaysizecheckbox_id').checked+ '/' + Ext.getCmp('gprscheckbox_id').checked});
        }
    }

});

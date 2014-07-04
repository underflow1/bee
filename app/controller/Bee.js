Ext.define('BeeApp.controller.Bee', {
    extend: 'Ext.app.Controller',

    views: ['Mainview', 'Cellwindow'],
    stores: ['Currentstate'],
    models: ['Currentstate'],

    init: function() {
        this.control({
            'viewport > mainview': {
                itemdblclick: this._showWindow
            },
            'cellwindow button[action=return]': {
                click: this._simReturn
            }
        });
    },

    _simReturn: function() {
        Ext.Ajax.request({
            url: '/test_ajax',
            method: 'POST',
            params : {act : 'vsdafsdfsdfasdfal'},
            success: function(response){
                var data=Ext.decode(response.responseText);
                if(data.success){
                    Ext.Msg.alert('Обновление',data.msg);
                }
            }
        })
    },


    _showWindow: function(grid, record) {
//        this.getCell().show();
        var win = new BeeApp.view.Cellwindow();
        win.show();
        var ph = Ext.getCmp('form-phonenumber').setValue(record.get('phonenumber'));
        var ph = Ext.getCmp('form-simnumber').setValue(record.get('simnumber'));
        var ph = Ext.getCmp('form-tariff').setValue(record.get('tariff'));
        var ph = Ext.getCmp('form-fio').setValue(record.get('fio'));
        var ph = Ext.getCmp('form-position').setValue(record.get('position'));
        var ph = Ext.getCmp('form-contract').setValue(record.get('contract'));
        var ph = Ext.getCmp('form-companyname').setValue(record.get('companyname'));
    }

});
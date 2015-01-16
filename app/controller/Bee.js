Ext.define('BeeApp.controller.Bee', {
    extend: 'Ext.app.Controller',

    views: ['Mainview', 'Cellwindow', 'Cellwindow2'],
    stores: ['Currentstate'],
    models: ['Currentstate'],

    init: function() {
        this.control({
            'viewport > mainview': {
                itemdblclick: this._showWindow
            },
            'cellwindow2 button[action=return]': {
                click: this._simReturn
            }
/*            ,
            'cellwindow2': {
                show: this._onShowWindow
            } */
        });
    },

    _simReturn: function(btn) {
        var win = btn.up('window');
        form = win.down('form');
//        console.log(form.getForm().getValues());
//        console.log(form.getForm().findField('phonenumber').getValue());

        Ext.Ajax.request({
            url: '/testsim/' + form.getForm().findField('phonenumber').getValue() + '/returnthenumber',
            success: function(response){
                Ext.Msg.alert('Возврат',response.responseText);
                win.close();
            }
        })
/*
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
        }) */
    },

    _showWindow: function(grid,record) {
        var view = Ext.widget('cellwindow2', {
            record: record
        });
//        console.log(view.record.get('phonenumber'));
        view.down('form').loadRecord(record);
        view.show();
    }

/*
    _onShowWindow: function(win) {
    console.log(win.record.get('phonenumber'));
        Ext.Ajax.request({
            url: '/testsim/' + win.record.get('phonenumber') + '/getcurrentstate',
            success: function(response) {
                console.log(response);
            },
            failure: function() {
                alert('ERROR');
            }
        });
    }
*/
});

Ext.define('BeeApp.controller.Bee', {
    extend: 'Ext.app.Controller',

    views: ['Mainview', 'Windowcell', 'Windowsimnumber','Windowplan','Windowgive','Windowtransfer'],
    stores: ['Currentstate'],
    models: ['Currentstate'],

    init: function() {
        this.control({
            'viewport > mainview': {
                itemdblclick: this._showWindow
            },
            'windowcell button[action=showchangeplan]': {
                click: this._showWindowPlan
            },
            'windowcell button[action=showchangesim]': {
                click: this._showWindowsimnumber
            },
            'windowcell button[action=return]': {
                click: this._simReturn
            },
            'windowsimnumber button[action=changesim]': {
                click: this._changeSim
            },
            'windowplan button[action=changeplan]': {
                click: this._changePlan
            },
            'windowcell button[action=reload]': {
                click: this._reloadAll
            },
            'windowcell button[action=showtransfer]': {
                click: this._showWindowTransfer
            },
            'windowcell button[action=showgive]': {
                click: this._showWindowGive
            },
            'windowtransfer button[action=transferthenumber]': {
                click: this._transferTheNumber
            },
            'windowgive button[action=givethenumber]': {
                click: this._giveTheNumber
            }




        });
    },

    _transferTheNumber: function(btn) {
        var win = btn.up('window');
        form = win.down('form');
        if (form.isValid()) {

            this._transfer(form.getForm().getValues());
            this._reloadAll(form.getForm().findField('phonenumber').getValue());
            win.close();
        } else {
            Ext.Msg.alert('Передать сим карту','Заполнены не все поля!');
        }
    },

    _giveTheNumber: function(btn) {
        var win = btn.up('window');
        form = win.down('form');
        if (form.isValid()) {
            Ext.Ajax.request({
                scope: this,
                method: 'POST',
                url: '/givethenumber',
                params : form.getForm().getValues(),
                success: function() {
                    //_reloadAll(form.getForm().findField('phonenumber').getValue());
                    this._reloadAll(form.getForm().findField('phonenumber').getValue());
                    win.close();
                },
                failure: function(response) {
                    console.log(response)
                }
            });
            //this._give(form.getForm().getValues());
        } else {
            Ext.Msg.alert('Выдать сим карту','Заполнены не все поля!');
        }
    },

    _give: function(array1) {
        Ext.Ajax.request({
            method: 'POST',
            url: '/givethenumber',
            params : array1
        })
    },

    _transfer: function(array1) {
        Ext.Ajax.request({
            method: 'POST',
            url: '/transferthenumber',
            params : array1
        })
    },

    _showWindowGive: function(btn) {
        var view = Ext.widget('windowgive');
        view.down('form').getForm().findField('phonenumber').setValue(btn.up('window').down('form').getForm().findField('phonenumber').getValue());
        view.show();
    },

    _showWindowTransfer: function(btn) {
        var view = Ext.widget('windowtransfer');
        view.down('form').getForm().findField('phonenumber').setValue(btn.up('window').down('form').getForm().findField('phonenumber').getValue());
        view.show();
    },

    _set_simNumber: function(phonenumber1, simnumber1) {
        Ext.Ajax.request({
            url: '/testsim/' + phonenumber1 + '/setsimnumber/' + simnumber1
        });
    },

    _set_Plan: function(phonenumber1, plan1) {
        Ext.Ajax.request({
            url: '/testsim/' + phonenumber1 + '/settariff/' + plan1
        });
    },

    _sendEmail: function(subject1,action1,phonenumber1,contract1){
        Ext.Ajax.request({
            method: 'POST',
            url: '/sendemail2',
            params : {
                subject: subject1,
                action: action1,
                phonenumber: phonenumber1,
                contract: contract1
            }
        })
    },

    _showWindowPlan: function(btn){

        var view = Ext.widget('windowplan');
        view.down('form').getForm().findField('phonenumber').setValue(btn.up('window').down('form').getForm().findField('phonenumber').getValue());
        view.show();
    },

    _reloadAll: function(number) {
        if(!Ext.isObject(number)) {
            win = Ext.getCmp('windowcell');
            win.down('form').load({
                method:'GET',
                url: '/testsim/' + number + '/getcurrentstate'
            });
        }
        console.log(number);
        Ext.getCmp('mainviewgrid_id').getStore().load();
     },

    _changeSim: function(btn) {
        var win = btn.up('window');
        form = win.down('form');
        if (form.isValid()) {
            this._set_simNumber(form.getForm().findField('phonenumber').getValue(), form.getForm().findField('simnumber').getValue());
            this._sendEmail('сим карты','перевыпустить на болванку ' + form.getForm().findField('simnumber').getValue(),form.getForm().findField('phonenumber').getValue(),'');
            this._reloadAll(form.getForm().findField('phonenumber').getValue());
        win.close();
        } else {
            Ext.Msg.alert('Замена сим карты','неверный формат номера сим карты');
        }
    },

    _changePlan: function(btn) {
        var win = btn.up('window');
        form = win.down('form');
        if (form.isValid()) {
            this._set_Plan(form.getForm().findField('phonenumber').getValue(), form.getForm().findField('plan').getValue());
            this._sendEmail('сим карты','установить ТП ' + form.getForm().findField('plan').getValue(),form.getForm().findField('phonenumber').getValue(),'');
            this._reloadAll(form.getForm().findField('phonenumber').getValue());
            win.close();
        } else {
            Ext.Msg.alert('Смена ТП','не выбран ТП');
        }
    },

    _simReturn: function(btn) {
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);
        function showResult(btn2) {
            console.log(btn2);
            if (btn2 === 'yes') {
                var win = btn.up('window');
                form = win.down('form');
                grid = btn.up('grid');
                Ext.Ajax.request({
                    url: '/testsim/' + form.getForm().findField('phonenumber').getValue() + '/returnthenumber',
                    success: function (response) {
                        var data = Ext.decode(response.responseText);
                        if (data.success) {
                            console.log(data.success);
                            console.log(data);
                            Ext.Msg.alert('Возврат', data.msg);
                            form.load({
                                method: 'GET',
                                url: '/testsim/' + form.getForm().findField('phonenumber').getValue() + '/getcurrentstate'
                            });
                            Ext.getCmp('mainviewgrid_id').getStore().load();
                            win.query('button[itemID=block_show]').forEach(function(buttons){buttons.setVisible(true)});
                            win.query('button[itemID=block_hide]').forEach(function(buttons){buttons.setVisible(false)});

                        } else {
                            Ext.Msg.alert('Возврат', data.msg);
                        }
                    },
                    failure: function () {
                        alert('ERROR');
                    }
                });
            }
        }
    },

    _showWindow: function(grid,record) {
        var view = Ext.widget('windowcell', {
            record: record
        });
        view.down('form').load({
            method:'GET',
            url: '/testsim/' + view.record.get('phonenumber') + '/getcurrentstate'
        });
        if(view.record.get('blocked')) {
            view.query('button[itemID=block_show]').forEach(function(buttons){buttons.setVisible(true)});
            view.query('button[itemID=block_hide]').forEach(function(buttons){buttons.setVisible(false)});
        } else {
            view.query('button[itemID=block_show]').forEach(function(buttons){buttons.setVisible(false)});
            view.query('button[itemID=block_hide]').forEach(function(buttons){buttons.setVisible(true)});
        }
        view.show();
    },

    _showWindowsimnumber: function(btn) {
        var view = Ext.widget('windowsimnumber');
        view.down('form').getForm().findField('phonenumber').setValue(btn.up('window').down('form').getForm().findField('phonenumber').getValue());
        view.show();
    }

});

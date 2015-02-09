var currentdata = new Object();

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
            'windowcell': {
                close: this._updateGrid
            },
            'windowcell button[action=showchangeplan]': {
                click: this._showWindowPlan
            },
            'windowcell button[action=email]': {
                click: this._sendObject
            },
            'windowcell button[action=block]': {
                click: this._setBlock
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
                click: this._refreshWindowcell
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

    _sendObject: function(btn) {
        var win = btn.up('window');
        form = win.down('form');
        email = 'it@teploset.ru';
        mydata = form.getForm().getValues();
        mydata.email = email;
        console.log(mydata);
        Ext.Ajax.request({
            method: 'POST',
            url: '/sendobject',
            params : mydata,
            success: function(response) {
                console.log(response.responseText)
            }
        })
    },

    _setBlock: function() {
        var me = this;
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function (btn2) {
            if (btn2 === 'yes') {
                if (currentdata.blocked) {
                    blockaction = 0;
                    blocktext = 'Блокировка снята!'
                } else {
                    blockaction = 1;
                    blocktext = 'Блокировка установлена!'
                }
                Ext.Ajax.request({
                    scope: this,
                    url: '/testsim/' + currentdata.phonenumber + '/setblock/' + blockaction,
                    success: function (response) {
                        currentdata.blocked = !currentdata.blocked;
                        Ext.Msg.alert(blocktext, Ext.decode(response.responseText).success);
                        me._refreshWindowcell();
                    }
                })
            }
        })
    },

    _transferTheNumber: function(btn) {
        var win = btn.up('window');
        form = win.down('form');
        if (form.isValid()) {
            Ext.Ajax.request({
                scope: this,
                method: 'POST',
                url: '/transferthenumber',
                params : form.getForm().getValues(),
                success: function() {
                    this._refreshWindowcell();
                    win.close();
                }
            });
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
                    currentdata.blocked = false;
                    this._refreshWindowcell();
                    win.close();
                }
            });
        } else {
            Ext.Msg.alert('Выдать сим карту','Заполнены не все поля!');
        }
    },

    _changeSim: function(btn) {
        var win = btn.up('window');
        form = win.down('form');
        if (form.isValid()) {
            Ext.Ajax.request({
                scope: this,
                url: '/testsim/' + currentdata.phonenumber + '/setsimnumber/' + form.getForm().findField('simnumber').getValue(),
                success: function() {
                    this._refreshWindowcell();
                    win.close();
                }
            });
        } else {
            Ext.Msg.alert('Замена сим карты','неверный формат номера сим карты');
        }
    },

    _changePlan: function(btn) {
        var win = btn.up('window');
        form = win.down('form');
        if (form.isValid()) {
            Ext.Ajax.request({
                scope: this,
                url: '/testsim/' + currentdata.phonenumber + '/settariff/' + form.getForm().findField('plan').getValue(),
                success: function() {
                    this._refreshWindowcell();
                    win.close();
                }
            });
        } else {
            Ext.Msg.alert('Смена ТП','не выбран ТП');
        }
    },

    _simReturn: function() {
        var me = this;
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function (btn2) {
            if (btn2 === 'yes') {
                Ext.Ajax.request({
                    url: '/testsim/' + currentdata.phonenumber + '/returnthenumber',
                    success: function (response) {
                        currentdata.blocked = true;
                        me._refreshWindowcell();
                    },
                    failure: function () {
                        alert('ERROR');
                    }
                });
            }
        });
    },

    _showWindowGive: function() {
        var view = Ext.widget('windowgive');
        view.down('form').getForm().findField('phonenumber').setValue(currentdata.phonenumber);
        view.show();
    },

    _showWindowTransfer: function() {
        var view = Ext.widget('windowtransfer');
        view.down('form').getForm().findField('phonenumber').setValue(currentdata.phonenumber);
        view.show();
    },

    _showWindowsimnumber: function() {
        var view = Ext.widget('windowsimnumber');
        view.down('form').getForm().findField('phonenumber').setValue(currentdata.phonenumber);
        view.show();
    },

    _showWindowPlan: function(){
        var view = Ext.widget('windowplan');
        view.down('form').getForm().findField('phonenumber').setValue(currentdata.phonenumber);
        view.show();
    },

    _showWindow: function(grid,record) {
        var view = Ext.widget('windowcell', {
            record: record
        });
        currentdata.phonenumber = view.record.get('phonenumber');
        currentdata.blocked = view.record.get('blocked');
        view.show();
        this._refreshWindowcell();
    },

    _updateGrid: function() {
        Ext.getCmp('mainviewgrid_id').getStore().load();
    },

    _refreshWindowcell: function() {
        console.log(currentdata);
        view = Ext.getCmp('windowcell');
        if(currentdata.blocked) {
            view.query('button[itemID=block_show]').forEach(function(buttons){buttons.setVisible(true)});
            view.query('button[itemID=block_hide]').forEach(function(buttons){buttons.setVisible(false)});
            view.query('button[itemID=block_button]').forEach(function(buttons){buttons.setText('Разблокировать!')});
        } else {
            view.query('button[itemID=block_show]').forEach(function(buttons){buttons.setVisible(false)});
            view.query('button[itemID=block_hide]').forEach(function(buttons){buttons.setVisible(true)});
            view.query('button[itemID=block_button]').forEach(function(buttons){buttons.setText('Блокировать!')});
        };
        view.down('form').load({
            method:'GET',
            url: '/testsim/' + currentdata.phonenumber + '/getcurrentstate'
        });
    }
});

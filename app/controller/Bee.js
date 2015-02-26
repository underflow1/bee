

Ext.define('BeeApp.controller.Bee', {
    extend: 'Ext.app.Controller',

    views: ['Mainview', 'Windowcell', 'Windowsimnumber','Windowplan','Windowgive','Windowtransfer'],
    stores: ['Currentstate', 'Companystore','Tariffstore','Zupdata'],
    models: ['Currentstate'],

    init: function() {
        this.control({
            'mainview': {
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
            'windowcell button[action=pril]': {
                click: this._printPril
            },
            'windowcell button[action=nakl]': {
                click: this._printNakl
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

    _sendObject: function() {
        if(Ext.getCmp('lettercheckbox').checked){
            currentdata.letter.phonenumber = currentdata.phonenumber;
            Ext.Ajax.request({
                method: 'POST',
                url: '/sendobject',
                params : currentdata.letter,
                success: function(response) {
                    console.log(response.responseText);
                }
            })
        }
        currentdata.letter = Object();
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
                    currentdata.letter = form.getForm().getValues();
                    currentdata.letter.template = 'letter_activate.html';
                    this._sendObject();
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
                    console.log(currentdata);
                    this._refreshWindowcell();
                    currentdata.letter.simnumber = form.getForm().getValues();
                    currentdata.letter.template = 'letter_changesim.html';
                    this._sendObject();
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
                url: '/testsim/' + currentdata.phonenumber + '/settariff/' + form.getForm().findField('tariffid').getValue(),
                success: function() {
                    this._refreshWindowcell();
                    currentdata.letter.tariff= form.getForm().findField('tariffid').getValue();
                    currentdata.letter.template = 'letter_changeplan.html';
                    this._sendObject();
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
                            currentdata.letter.template = 'letter_return.html';
                            me._sendObject();
                            me._refreshWindowcell();
                        },
                        failure: function () {
                            alert('ERROR');
                        }
                    });
                }
            });
    },

    _setBlock: function() {
            var me = this;
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function (btn2) {
                if (btn2 === 'yes') {
                    if (currentdata.blocked) {
                        blockaction = 0;
                        blocktext = 'Блокировка снята!';
                        currentdata.letter.template = 'letter_unblock.html';
                    } else {
                        blockaction = 1;
                        blocktext = 'Блокировка установлена!';
                        currentdata.letter.template = 'letter_block.html';
                    }
                    Ext.Ajax.request({

                        url: '/testsim/' + currentdata.phonenumber + '/setblock/' + blockaction,
                        success: function (response) {
                            currentdata.blocked = !currentdata.blocked;
                            Ext.Msg.alert(blocktext, Ext.decode(response.responseText).success);
                            me._refreshWindowcell();
                            me._sendObject();
                        },
                        failure: function(response) {
                            Ext.Msg.alert('Ошибка', Ext.decode(response.responseText).errorMessage);
                        }
                    })
                }
            })
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
            console.log('права: ' + currentdata.rights.changeplan);
            var view = Ext.widget('windowplan');
            view.down('form').getForm().findField('phonenumber').setValue(currentdata.phonenumber);
            view.show();
    },

    _printPril: function() {
        window.open('/pril/' + currentdata.phonenumber);
    },

    _printNakl: function() {
        window.open('/nakl/' + currentdata.phonenumber);
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
        view = Ext.getCmp('windowcell');
        view.down('form').load({
            method:'GET',
            url: '/testsim/' + currentdata.phonenumber + '/getcurrentstate'
        });
        if(currentdata.blocked) {
            view.query('button[itemID=block_show]').forEach(function(buttons){buttons.setVisible(true)});
            view.query('button[itemID=block_hide]').forEach(function(buttons){buttons.setVisible(false)});
            view.query('button[itemID=block_button]').forEach(function(buttons){buttons.setText('Разблокировать!')});
        } else {
            view.query('button[itemID=block_show]').forEach(function(buttons){buttons.setVisible(false)});
            view.query('button[itemID=block_hide]').forEach(function(buttons){buttons.setVisible(true)});
            view.query('button[itemID=block_button]').forEach(function(buttons){buttons.setText('Блокировать!')});
        };
    }

});

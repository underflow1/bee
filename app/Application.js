Ext.onReady(

    function(){


function showWindow(){
        if(!win){
                var win = new Ext.Window({
                      title: 'действия с сим картой',
                      items: [{
                          width : 400,
                          height: 400,
                          id: 'login-form',
                          bodyStyle: 'padding:10px;',
                          xtype: 'form',
                          buttonAlign: 'left',
                          items: [            // массив полей формы
                              {   xtype: 'textfield',
                                  fieldLabel: 'номер',
                                  name: 'phonenumber',
                                  id: 'form-phonenumber'
                              },{
                                  xtype: 'textfield',
                                  name: 'fio',
                                  fieldLabel: 'Владелец',
                                  width: 350,
                                  id: 'form-fio'
                              },{
                                 xtype: 'textfield',
                                 fieldLabel: 'договор',
                                 name: 'contract',
                                 id: 'form-contract'
                              }],
                          buttons: [{
                              text: 'ололо',
                              handler: function()
                              { Ext.getCmp('login-form')
                                  .getForm()
                                  .submit({
                                      url: '/test_ajax',
                                      params : {act : 'val'},
					success: function(form, action){ Ext.Msg.alert(action.result.msg)},
                                        failure: function(form, action){ Ext.Msg.alert('sdf')}
	
                                  });
                              }}]
                      }]
                })      
        }
        win.show();
};

    var addButton = Ext.create('Ext.button.Button', {
        text : 'КНОПА',
	listeners : {
		            click: function() {
                        showWindow();
		            }
	            }
    });



        Ext.define('currentstate_model', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'phonenumber', type: 'string'},
                {name: 'simnumber', type: 'string'},
                {name: 'tariff', type: 'string'},
                {name: 'fio', type: 'string'},
                {name: 'position', type: 'string'},
                {name: 'dtfblck', type: 'string'},
                {name: 'contract', type: 'string'},
                {name: 'companyname', type: 'string'},
                {name: 'deduction', type: 'string'},
                {name: 'pkg', type: 'string'},
                {name: 'dtfrm', type: 'string'}
            ],
            idProperty: 'phonenumber'
        });

        var currentstate_store = new Ext.data.Store({
            model:"currentstate_model",
            pageSize: 50,
            proxy:{
                type: 'ajax',
                url: '/current',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true
        });

        var grid = Ext.create('Ext.grid.Panel', {
            store: currentstate_store,
            columns: [
                {
                    text     : 'номер',
                    dataIndex: 'phonenumber',
                    width: 80
                },{
                    text     : 'номер симкарты',
                    dataIndex: 'simnumber',
                    width: 125
                },
                {
                    text     : 'ТП',
                    dataIndex: 'tariff',
                    width: 30
                },
                {
                    text     : 'ФИО',
                    dataIndex: 'fio',
                    width: 250
                },{
                    text     : 'Должность',
                    dataIndex: 'position',
                    width: 250
                },{
                    text     : 'блок',
                    dataIndex: 'dtfblck',
                    width: 70
                },{
                    text     : 'Договор',
                    dataIndex: 'contract',
                    width: 70
                },{
                    text     : 'Компания',
                    dataIndex: 'companyname',
                    width: 200
                },{
                    text     : 'уд',
                    dataIndex: 'deduction',
                    width: 50
                },{
                    text     : 'трф',
                    dataIndex: 'pkg',
                    width: 30
                },
                {
                    text     : 'рм',
                    dataIndex: 'dtfrm',
                    width: 70
                }],
 
	    listeners : { itemdblclick: {
           fn : function(grid, record) {
               showWindow();
               var ph = Ext.getCmp('form-phonenumber').setValue(record.get('phonenumber'));
               var ph = Ext.getCmp('form-fio').setValue(record.get('fio'));
               var ph = Ext.getCmp('form-contract').setValue(record.get('contract'));
           }
        }},
            height: 900,
            width: 1245,
            title: 'Список всех номеров на текущий момент',
            renderTo: 'grid2',
            tbar: Ext.create('Ext.PagingToolbar', {
                store: currentstate_store,
                displayInfo: true
            }),
		bbar:[addButton]
        });

    });


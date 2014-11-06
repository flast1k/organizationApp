/**
 * Created with IntelliJ IDEA.
 * User: ubuntu
 * Date: 10/28/14
 * Time: 5:46 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('OrganizationApp.view.form.TaskForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.taskform',
    requires: ['Ux.InputTextMask'],
    title: 'Add / Edit Task',
    layout: 'fit',
    autoShow: true,
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'hidden',
                        name: 'id',
                        fieldLabel: 'id'
                    },
                    {
                        xtype: 'textfield',
                        name: 'name',
                        fieldLabel: 'Name'
                    },
                    {
                        xtype: 'textfield',
                        name: 'description',
                        fieldLabel: 'Description'
                    },
                    {
                        xtype: 'datefield',
                        name: 'spent_time',
                        plugins: [new Ux.InputTextMask('99/99/9999', true)],
                        fieldLabel: 'Spent time'
                    }
                    ,
                    {
                        xtype: 'combobox',
                        store: ['Open', 'In progress','Blocked', 'Closed'],
                        name: 'status',
                        fieldLabel: 'Status',
                        editable: false,
                        value: 'Start'
                    },
                    {
                        xtype: 'hidden',
                        name: 'employee_id',
                        fieldLabel: 'employee_id'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }

});


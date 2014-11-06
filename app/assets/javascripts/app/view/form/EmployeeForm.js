/**
 * Created with IntelliJ IDEA.
 * User: ubuntu
 * Date: 10/28/14
 * Time: 5:46 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('OrganizationApp.view.form.EmployeeForm', {
    extend: 'Ext.window.Window',
    requires: ['Ux.InputTextMask'],
    alias: 'widget.employeeform',
    title: 'Add / Edit Employee',
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
                        name: 'first_name',
                        fieldLabel: 'First Name'
                    },
                    {
                        xtype: 'textfield',
                        name: 'second_name',
                        fieldLabel: 'Second Name'
                    },
                    {
                        xtype: 'textfield',
                        plugins: [new Ux.InputTextMask('(999)999-9999', true)],
                        name: 'phone',
                        fieldLabel: 'Phone'
                    },
                    {
                        xtype: 'datefield',
                        name: 'hire_date',
                        plugins: [new Ux.InputTextMask('99/99/9999', true)],
                        fieldLabel: 'Hire date'
                    }
                    ,
                    {
                        xtype: 'textfield',
                        name: 'place',
                        fieldLabel: 'Place'
                    },
                    {
                        xtype: 'hidden',
                        name: 'organization_id',
                        fieldLabel: 'organization_id'
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


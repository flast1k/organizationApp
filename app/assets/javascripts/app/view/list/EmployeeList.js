/**
 * Created with IntelliJ IDEA.
 * User: ubuntu
 * Date: 10/29/14
 * Time: 3:01 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('OrganizationApp.view.list.EmployeeList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.employeelist',
    title: 'Employees of organization',
    store: 'Employees',
    viewConfig: {
        emptyText: 'No employees',
        deferEmptyText: false
    },


    initComponent: function () {
        var me = this;
        this.columns = [
            {
                header: 'First Name', dataIndex: 'first_name', flex: 1,
                renderer: function (val) {
                    return '<a href="javascript:void(0);">' + val + '</a>';
                }
            },
            { header: 'Second Name', dataIndex: 'second_name', flex: 1 },
            { header: 'Phone', dataIndex: 'phone', flex: 1 },
            { header: 'Hire date', dataIndex: 'hire_date', flex: 1, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: 'Place', dataIndex: 'place', flex: 1 },
            { header: 'Action',
                xtype: 'actioncolumn',
                width: 50,
                items: [
                    {
                        iconCls: 'icon-edit',
                        icon: 'edit.gif',
                        tooltip: 'Edit'
                    },
                    {
                        iconCls: 'icon-delete',
                        icon: 'delete.gif',
                        tooltip: 'Delete'
                    }
                ]
            }

        ];
        this.callParent(arguments);
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: 'Add employee',
                    action: 'addEmployee'
                }
            ]
        }
    ]
});
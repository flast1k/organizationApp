/**
 * Created with IntelliJ IDEA.
 * User: ubuntu
 * Date: 10/29/14
 * Time: 3:01 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('OrganizationApp.view.list.TaskList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.tasklist',
    title: 'Tasks of employee',
    store: 'Tasks',
    viewConfig: {
        emptyText: 'No tasks',
        deferEmptyText: false
    },


    initComponent: function () {
        var me = this;
        this.columns = [
            {
                header: 'Name', dataIndex: 'name', flex: 1,
                renderer: function (val) {
                    return '<a href="javascript:void(0);">' + val + '</a>';
                }
            },
            { header: 'Description', dataIndex: 'description', flex: 1 },
            { header: 'Spent time', dataIndex: 'spent_time', flex: 1, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: 'Status', dataIndex: 'status', flex: 1 },
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
                    text: 'Add task',
                    action: 'addTask'
                }
            ]
        }
    ]
});
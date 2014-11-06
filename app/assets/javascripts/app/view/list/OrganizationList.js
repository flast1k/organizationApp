/**
 * Created with IntelliJ IDEA.
 * User: ubuntu
 * Date: 10/28/14
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('OrganizationApp.view.list.OrganizationList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.organizationlist',
    title: 'All Organizations',
    store: 'Organizations',
    viewConfig: {
        emptyText: 'No organizations',
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
            {
                header: 'Site', dataIndex: 'site', flex: 1
            },
            {
                header: 'Description', dataIndex: 'description', flex: 1
            },
            {
                header: 'Action',
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
                    text: 'Add organization',
                    action: 'addOrganization'
                }
            ]
        }
    ]
});
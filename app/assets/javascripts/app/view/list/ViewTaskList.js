/**
 * Created with IntelliJ IDEA.
 * User: ubuntu
 * Date: 10/29/14
 * Time: 3:50 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('OrganizationApp.view.list.ViewTaskList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.viewtasklist',
    hidden: true,
    viewConfig: {
        emptyText: 'No tasks',
        deferEmptyText: false
    },

    initComponent: function() {
        var me = this;
        this.columns = [
            { header: 'Name',  dataIndex: 'name',  flex: 1 },
            { header: 'Description',  dataIndex: 'description',  flex: 1 },
            { header: 'Spent time', dataIndex: 'spent_time', flex: 1, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: 'Status', dataIndex: 'status', flex: 1 }
        ];
        this.callParent(arguments);
    }
});
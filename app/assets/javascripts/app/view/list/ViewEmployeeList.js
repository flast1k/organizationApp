/**
 * Created with IntelliJ IDEA.
 * User: ubuntu
 * Date: 10/29/14
 * Time: 10:54 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('OrganizationApp.view.list.ViewEmployeeList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.viewemployeelist',
    hidden: true,
    viewConfig: {
        emptyText: 'No employees',
        deferEmptyText: false
    },

    initComponent: function() {
        var me = this;
        this.columns = [
            { header: 'First Name',  dataIndex: 'first_name',  flex: 1 },
            { header: 'Second Name',  dataIndex: 'second_name',  flex: 1 },
            { header: 'Phone', dataIndex: 'phone', flex: 1 },
            { header: 'Hire date', dataIndex: 'hire_date', flex: 1, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: 'Place', dataIndex: 'place', flex: 1 }
        ];
        this.callParent(arguments);
    }
});
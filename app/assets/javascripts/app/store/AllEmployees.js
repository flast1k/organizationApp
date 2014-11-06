/**
 * Created with IntelliJ IDEA.
 * User: ubuntu
 * Date: 10/30/14
 * Time: 11:48 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('OrganizationApp.store.AllEmployees', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    autoSync: false,
    fields: [
        { name: 'id', type: 'int' },
        { name: 'second_name', type: 'string' }
],
    proxy: {
        type: 'rest',
        url: '/api/employees',
        reader: {
            root: 'employee',
            type: 'json',
            successProperty: 'success'
        }
    },

    listeners: {
        load: function () {
            console.log(arguments);
        },
        update: function () {
            console.log(arguments);
        },
        beforesync: function () {
            console.log(arguments);
        }
    }
});
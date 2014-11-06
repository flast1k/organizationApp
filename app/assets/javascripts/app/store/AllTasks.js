// Models are typically used with a Store, which is basically a collection of Model instances.
Ext.define('OrganizationApp.store.AllTasks', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    autoSync: false,
    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' }
    ],
    proxy: {
        type: 'rest',
        url: '/api/tasks',
        reader: {
            root: 'task',
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

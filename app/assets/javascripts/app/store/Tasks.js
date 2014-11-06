// Models are typically used with a Store, which is basically a collection of Model instances.
Ext.define('OrganizationApp.store.Tasks', {
    extend: 'Ext.data.Store',

    model: 'OrganizationApp.model.Task',
//    autoLoad: true,
    autoSync: false,
    proxy: {
        type: 'rest',
        reader: {
            root: 'task',
            type: 'json',
            successProperty: 'success'
        },
        writer: {
            // wrap user params for Rails
            getRecordData: function(record) {
                return { task: record.data };
            }
        }
    },

    buildUrl: function (id) {
        var me = this;
        me.proxy.url = '/api/employee/' + id + '/tasks';
    },
    listeners: {
        load: function () {
            console.log(this.proxy.url);
        },
        update: function () {
            console.log(arguments);
        },
        beforesync: function () {
            console.log(arguments);
        }
    }
});

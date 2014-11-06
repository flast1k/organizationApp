// Models are typically used with a Store, which is basically a collection of Model instances.
Ext.define('OrganizationApp.store.Employees', {
    extend: 'Ext.data.Store',

    model: 'OrganizationApp.model.Employee',
//    autoLoad: true,
    autoSync: false,

    proxy: {
        type: 'rest',
        reader: {
            root: 'employee',
            type: 'json',
            successProperty: 'success'
        },
        writer: {
            // wrap user params for Rails
            getRecordData: function(record) {
                return { employee: record.data };
            }
        }
    },

    buildUrl: function (id) {
        var me = this;
        me.proxy.url = '/api/organization/' + id + '/employees';
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

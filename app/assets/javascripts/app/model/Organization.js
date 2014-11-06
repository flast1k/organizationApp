Ext.define('OrganizationApp.model.Organization', {
    extend: 'Ext.data.Model',

    requires: [
        'OrganizationApp.model.Employee'
    ],

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'site', type: 'string' },
        { name: 'description', type: 'string' }
    ],
    validations: [
        {type: 'presence', field: 'name'}
    ],

    proxy: {
        url: '/api/organizations',
        type: 'rest',

        reader: {
            root: 'organization',
            type: 'json',
            successProperty: 'success'
        },
        writer: {
            // wrap user params for Rails
            getRecordData: function (record) {
                return { organization: record.data };
            }
        }
    }
});

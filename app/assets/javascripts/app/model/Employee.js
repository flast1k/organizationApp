Ext.define('OrganizationApp.model.Employee', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'first_name', type: 'string' },
        { name: 'second_name', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'hire_date', type: 'date' },
        { name: 'place', type: 'string' },
        { name: 'organization_id', type: 'int' }
    ],
    validations: [
        {type: 'presence', field: 'first_name'},
        {type: 'presence', field: 'second_name'}
    ]

});

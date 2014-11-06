Ext.define('OrganizationApp.model.Task', {
  extend: 'Ext.data.Model',

  fields: [
    { name: 'id', type: 'int' },
    { name: 'name', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'spent_time', type: 'date' },
    { name: 'status', type: 'string' },
    { name: 'employee_id', type: 'int' }
  ],
    validations: [
        {type: 'presence', field: 'name'},
        {type: 'presence', field: 'description'}
    ]
});

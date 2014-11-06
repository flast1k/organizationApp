/**
 *= require_self
 */

// create a new instance of Application class
Ext.application({
    // the global namespace
    name: 'OrganizationApp',

    appFolder: '/assets/app',

    controllers: [
        'Main',
        'Organization',
        'Employee',
        'Task'
    ],
    stores: [
        'Organizations',
        'Employees',
        'Tasks',
        'AllEmployees',
        'AllTasks'
    ],
    models: [
        'Organization',
        'Employee',
        'Task'
    ],

    views: [
        'Viewport'
    ],

    autoCreateViewport: true
});

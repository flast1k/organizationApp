Ext.define('OrganizationApp.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.layout.container.Fit',
        'OrganizationApp.view.Main',
        'OrganizationApp.view.list.OrganizationList',
        'OrganizationApp.view.list.TaskList',
        'OrganizationApp.view.list.EmployeeList',
        'OrganizationApp.view.list.ViewEmployeeList',
        'OrganizationApp.view.list.ViewTaskList',
        'OrganizationApp.view.form.OrganizationForm',
        'OrganizationApp.view.form.EmployeeForm',
        'OrganizationApp.view.form.TaskForm',
        'OrganizationApp.view.description.ViewTaskDescription',
        'OrganizationApp.view.description.TaskDescription'
    ],

    layout: {
        type: 'fit'
    },

    items: [
        {
            xtype: 'app-main'
        }
    ]
});

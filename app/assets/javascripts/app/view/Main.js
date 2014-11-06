Ext.define('OrganizationApp.view.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.layout.container.Border'
    ],

    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    items: [
        {
            region: 'west',
            xtype: 'panel',
            layout: 'fit',
            title: 'Organizations, Employees, Tasks',
            width: 300,
            items: [
                {
                    xtype: 'panel',
                    itemId: 'panel-list',
                    border: false
                }
            ]
        },
        {
            region: 'center',
            xtype: 'panel',
            title: 'Details',
            itemId: 'details-panel',
            layout: {
                type: 'vbox',
                align : 'stretch',
                pack  : 'start'
            },
            items: [
                {
                    margin: "0 0 10 0",
                    xtype: 'organizationlist',
                    itemId: 'organization-list',
                    title: 'Organizations Table'
                },
                {
                    xtype: 'viewemployeelist',
                    itemId: 'view-employee-list'
                }
            ]
        }
    ]
});
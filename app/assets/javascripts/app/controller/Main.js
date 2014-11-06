Ext.define('OrganizationApp.controller.Main', {
    extend: 'Ext.app.Controller',

    stores: ['Organizations', 'Employees', 'AllEmployees', 'AllTasks', 'Tasks'],
    models: ['Organization', 'Employee', 'Task'],

    refs: [
        {
            ref: 'organizationPanel',
            selector: '#panel-list'
        },
        {
            ref: 'detailsPanel',
            selector: '#details-panel'
        },
        {
            ref: 'employeeList',
            selector: 'employeelist'
        }
    ],
    init: function () {
        var me = this;
        Ext.getStore('Organizations').addListener('datachanged', me.onStoreDataChange, me),
            Ext.getStore('AllEmployees').addListener('datachanged', me.onStoreDataChange, me),
            Ext.getStore('AllTasks').addListener('datachanged', me.onStoreDataChange, me),
            this.control({
                '#panel-list': {
                    render: me.initPanel
                }
            });
    },

    initPanel: function () {
        this.onStoreDataChange();
    },

    onStoreDataChange: function () {
        this.clearOrganizationPanel();
        var me = this;
        var store = me.getOrganizationsStore();
        var organizationsRecord = store.data;
        var panel = me.getOrganizationPanel();
        var organizationContainer;
        var mainContainer = new Ext.container.Container({
            layout: 'fit',
            items: [
                {
                    xtype: 'container',
                    html: 'Organizations',
                    cls: 'rootClass',
                    border: false,
                    listeners: {
                        render: function (container) {
                            container.getEl().on('dblclick', function () {
                                me.onDbclickMainContainerListener()
                            });
                        }
                    }
                },
                {
                    xtype: 'container',
                    id: 'organizationContainer',
                    border: false
                }

            ]
        });
        panel.add(mainContainer);
        organizationContainer = Ext.ComponentQuery.query('#organizationContainer')[0];
        organizationsRecord.each(function (record) {
            var myNewContainer = new Ext.container.Container({
                layout: 'fit',
                items: [
                    {
                        xtype: 'container',
                        html: record.get('name'),
                        border: false,
                        cls: 'organizationClass',
                        listeners: {
                            render: function (container) {
                                container.getEl().on('click', function () {
                                    me.onClickOrganizationListener(record);
                                });
                                container.getEl().on('dblclick', function () {
                                    me.onDbclickOrganizationListener(record)
                                });
                            }
                        }
                    },
                    {
                        xtype: 'container',
                        id: 'employeeContainer' + record.get('id'),
                        border: false,
                        hideFlag: true
                    }

                ]
            });
            organizationContainer.add(myNewContainer);
        })

    },

    onDbclickMainContainerListener: function(){
        var me = this;
        var detailsPanel = me.getDetailsPanel();
        var organizationList = Ext.widget('organizationlist');
        var viewEmployeeList = Ext.widget('viewemployeelist');
        var organizationStore = me.getOrganizationsStore();
        organizationList.itemId = 'organization-list';
        organizationList.setWidth(500);
        organizationList.margin = "0 0 10 0";
        viewEmployeeList.itemId = 'view-employee-list';
        viewEmployeeList.setWidth(500);
        detailsPanel.items.each(function (item, index, len) {
            this.remove(item, true);
        }, detailsPanel);
        organizationStore.load(function (records, operation, success) {
            detailsPanel.add(organizationList);
            detailsPanel.add(viewEmployeeList);
        });
    },
    clearOrganizationPanel: function () {
        var me = this;
        var panel = me.getOrganizationPanel();
        panel.items.each(function (item, index, len) {
            this.remove(item, true); //and remove from DOM !
        }, panel);
    },

    onClickOrganizationListener: function (record) {
        var me = this;
        var employeeStore = Ext.create('OrganizationApp.store.Employees');
        var employeeContainer = Ext.ComponentQuery.query('#employeeContainer' + record.get('id'))[0];
        var children = Ext.ComponentQuery.query('#employeeContainer' + record.get('id') + ' > container');
        if (!employeeContainer.hideFlag) {

            if (children.length > 0) {
                Ext.each(children, function (child) {
                    child.hide();
                });
                employeeContainer.hideFlag = true;

            }
        }
        else {
            if (children.length > 0) {
                Ext.each(children, function (child) {
                    child.show();
                });
                employeeContainer.hideFlag = false;

            }
            else {
                var employeesRecord;
                employeeStore.buildUrl(record.get('id'));
                employeeStore.load(function (records, operation, success) {
                    employeesRecord = employeeStore.data;
                    employeesRecord.each(function (employeeRecord) {
                        employeeContainer.add(
                            {
                                xtype: 'container',
                                html: employeeRecord.get('second_name'),
                                cls: 'employeeClass',
                                listeners: {
                                    render: function (container) {
                                        container.getEl().on('click', function () {
                                            me.onClickEmployeeListener(employeeRecord);
                                        });
                                        container.getEl().on('dblclick', function () {
                                            me.onDbclickEmployeeListener(employeeRecord)
                                        });
                                    }
                                }
                            },
                            {
                                xtype: 'container',
                                id: 'taskContainer' + employeeRecord.get('id'),
                                border: false,
                                hideFlag: true
                            }
                        );
                    });
                });
                employeeContainer.hideFlag = false;
            }
        }
    },

    onClickEmployeeListener: function (record) {
        var me = this;
        var taskStore = Ext.create('OrganizationApp.store.Tasks');
        var taskContainer = Ext.ComponentQuery.query('#taskContainer' + record.get('id'))[0];
        var children = Ext.ComponentQuery.query('#taskContainer' + record.get('id') + ' > container');
        if (!taskContainer.hideFlag) {

            if (children.length > 0) {
                Ext.each(children, function (child) {
                    child.hide();
                });
                taskContainer.hideFlag = true;

            }
        }
        else {
            if (children.length > 0) {
                Ext.each(children, function (child) {
                    child.show();
                });
                taskContainer.hideFlag = false;

            }
            else {
                var taskRecord;
                taskStore.buildUrl(record.get('id'));
                taskStore.load(function (records, operation, success) {
                    taskRecord = taskStore.data;
                    taskRecord.each(function (taskRecord) {
                        taskContainer.add(
                            {
                                xtype: 'container',
                                html: taskRecord.get('name'),
                                cls: 'taskClass',
                                listeners: {
                                    render: function (container) {
                                        container.getEl().on('dblclick', function () {
                                            me.onDbclickTaskListener(taskRecord)
                                        });
                                    }
                                }
                            }
                        );
                    });
                });
                taskContainer.hideFlag = false;
            }
        }
    },

    onDbclickOrganizationListener: function (record) {
        var me = this;
        var detailsPanel = me.getDetailsPanel();
        var employeeList = Ext.widget('employeelist');
        var viewTaskList = Ext.widget('viewtasklist');
        var employeeStore = me.getEmployeesStore();
        employeeList.itemId = 'employee-list';
        employeeList.organizationId = record.get('id');
        employeeList.setWidth(500);
        employeeList.setTitle('Employees of ' + record.get('name') + ' organization');
        employeeList.margin = "0 0 10 0";
        viewTaskList.itemId = 'view-task-list';
        viewTaskList.setWidth(500);
        employeeStore.buildUrl(record.get('id'));
        employeeStore.load(function (records, operation, success) {
            detailsPanel.items.each(function (item, index, len) {
                this.remove(item, true);
            }, detailsPanel);
            detailsPanel.add(employeeList);
            detailsPanel.add(viewTaskList);
        });
    },

    onDbclickEmployeeListener: function (record) {
        var me = this;
        var detailsPanel = me.getDetailsPanel();
        var taskList = Ext.widget('tasklist');
        var viewTaskDescription = Ext.widget('viewtaskdescription');
        var taskStore = me.getTasksStore();
        taskList.itemId = 'task-list';
        taskList.employeeId = record.get('id');
        taskList.setWidth(500);
        taskList.setTitle('Tasks of ' + record.get('second_name') + ' employee');
        taskList.margin = "0 0 10 0";
        viewTaskDescription.setWidth(500);
        viewTaskDescription.itemId = 'task-description';
        taskStore.buildUrl(record.get('id'));
        taskStore.load(function (records, operation, success) {
            detailsPanel.items.each(function (item, index, len) {
                this.remove(item, true);
            }, detailsPanel);
            detailsPanel.add(taskList);
            detailsPanel.add(viewTaskDescription);
        });

    },

    onDbclickTaskListener: function (record) {
        var me = this;
        var detailsPanel = me.getDetailsPanel();
        var taskDescription = Ext.widget('taskdescription');
        var time = record.get('spent_time');
        var employees = Ext.create('OrganizationApp.store.Employees');
        employees.buildUrl(record.get('employee_id'));
        employees.load(function (records, operation, success) {
            var employeeRecord = employees.first();
            taskDescription.setTitle('Task ' + record.get('name'));
            taskDescription.getComponent('name-label').setText('Name: ' + record.get('name'));
            taskDescription.getComponent('description-label').setText('Description: ' + record.get('description'));
            taskDescription.getComponent('spent_time-label').setText('Spent time: ' + Ext.Date.format(time, 'd/m/Y'));
            taskDescription.getComponent('status-label').setText('Status: ' + record.get('status'));
            taskDescription.getComponent('owner-label').setText('Owner: ' + employeeRecord.get('second_name'));
            taskDescription.setWidth(300);
            detailsPanel.items.each(function (item, index, len) {
                this.remove(item, true);
            }, detailsPanel);
            detailsPanel.add(taskDescription);
        });

    }

});

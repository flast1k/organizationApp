Ext.define('OrganizationApp.controller.Task', {
    extend: 'Ext.app.Controller',
    requires: 'OrganizationApp.controller.Main',
    stores: ['Tasks', 'AllTasks'],
    models: ['Task'],
    refs: [
        {
            ref: 'taskList',
            selector: '#task-list'
        },
        {
            ref: 'taskDescription',
            selector: '#task-description'
        },
        {
            ref: 'descriptionLabel',
            selector: '#description-label'
        }
    ],
    init: function () {
        var me = this;
        this.control({
            'button[action=addTask]': {
                click: this.addTask
            },
            '#task-list actioncolumn': {
                click: this.onAction
            },
            '#task-list': {
                itemclick: this.onSelectItem,
                cellclick: {
                    fn: function (table, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
                        if (cellIndex == 0)
                        {
                            me.getController('Main').onDbclickTaskListener(record);
                        }
                    }
                }
            },
            'taskform button[action=save]': {
                click: this.createTask
            }

        });
    },

    onSelectItem: function (dv, record, item, index, e) {
        var taskDescriptionPanel = this.getTaskDescription();
        var descriptionLabel = this.getDescriptionLabel();
        descriptionLabel.setText(record.get('description'));
        taskDescriptionPanel.setTitle('Description of ' + record.get('name') + ' task');
        taskDescriptionPanel.show();
    },
    addTask: function () {
        var view = Ext.widget('taskform');
        view.show();
    },

    createTask: function (button) {
        var allTasks = this.getAllTasksStore();
        var win = button.up('window');
        var form = win.down('form');

        var store = this.getTasksStore();
        var values = form.getValues();

        var task = Ext.create('OrganizationApp.model.Task', values);
        task.set('employee_id', this.getTaskList().employeeId);
        var errors = task.validate();

        if (errors.isValid()) {
            var formRecord = form.getRecord();

            if (formRecord) {
                // perform update
                formRecord.set(values);
            } else {
                store.add(task);
            }
            store.sync({
                success: function () {
                    win.close();
                    allTasks.load();
                },
                failure: function (batch, options) {
                    var serverSideValidationErrors = batch.exceptions[0].error;

                    var errors = new Ext.data.Errors();
                    for (var field in serverSideValidationErrors) {
                        var message = serverSideValidationErrors[field].join(", ");
                        errors.add(undefined, { field: field, message: message });
                    }
                    form.getForm().markInvalid(errors);
                }
            });
        } else {
            form.getForm().markInvalid(errors);
        }
    },

    onAction: function (view, cell, row, col, e) {
        var clsName = e.getTarget().className.match(/\bicon-(\w+)\b/);
        var rec = this.getTasksStore().getAt(row);
        if (clsName) {
            switch (clsName[1]) {
                case 'edit':
                    this.editTask(row);
                    break;
                case 'delete':
                    this.deleteTask(row);
                    break;
            }
        }
    },

    editTask: function (row) {
        var record = this.getTasksStore().getAt(row);
        var view = Ext.widget('taskform');
        view.down('form').loadRecord(record);
    },

    deleteTask: function (row) {
        var record = this.getTasksStore().getAt(row);
        if (record) {
            var store = this.getTasksStore();
            var allTasks = this.getAllTasksStore();
            store.remove(record);
            store.sync({
                success: function () {
                    allTasks.load();
                }
            });
        }
    }

});

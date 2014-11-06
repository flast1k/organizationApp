Ext.define('OrganizationApp.controller.Employee', {
    extend: 'Ext.app.Controller',
    requires: 'OrganizationApp.controller.Main',
    stores: ['Employees', 'AllEmployees'],
    models: ['Employee'],
    refs: [
        {
            ref: 'employeeList',
            selector: '#employee-list'
        },
        {
            ref: 'viewtaskList',
            selector: '#view-task-list'
        }
    ],

    init: function () {
        var me = this;
        this.control({
            'button[action=addEmployee]': {
                click: this.addEmployee
            },
            '#employee-list actioncolumn': {
                click: this.onAction
            },
            '#employee-list': {
                itemclick: this.onSelectItem,
                cellclick: {
                    fn: function (table, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
                        if (cellIndex == 0)
                        {
                            me.getController('Main').onDbclickEmployeeListener(record);
                        }
                    }
                }
            },
            'employeeform button[action=save]': {
                click: this.createEmployee
            }

        });
    },

    onSelectItem: function (dv, record, item, index, e) {
        var viewTaskList = this.getViewtaskList();
        viewTaskList.reconfigure(Ext.create('OrganizationApp.store.Tasks'));
        var store = viewTaskList.getStore();
        store.buildUrl(record.get('id'));
        store.load(function (records, operation, success) {
            viewTaskList.setTitle('Tasks of ' + record.get('first_name') + ' employee');
            viewTaskList.show()
        });
    },

    addEmployee: function () {
        var view = Ext.widget('employeeform');
        view.show();
    },

    createEmployee: function (button) {
        var allEmployees = this.getAllEmployeesStore();
        var win = button.up('window');
        var form = win.down('form');

        var store = this.getEmployeesStore();
        var values = form.getValues();

        var employee = Ext.create('OrganizationApp.model.Employee', values);
        employee.set('organization_id', this.getEmployeeList().organizationId);
        var errors = employee.validate();

        if (errors.isValid()) {
            var formRecord = form.getRecord();

            if (formRecord) {
                // perform update
                formRecord.set(values);
            } else {
                store.add(employee);
            }
            store.sync({
                success: function () {
                    win.close();
                    allEmployees.load();
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
        var rec = this.getEmployeesStore().getAt(row);
        if (clsName) {
            switch (clsName[1]) {
                case 'edit':
                    this.editEmployee(row);
                    break;
                case 'delete':
                    this.deleteEmployee(row);
                    break;
            }
        }
    },

    editEmployee: function (row) {
        var record = this.getEmployeesStore().getAt(row);
        var view = Ext.widget('employeeform');
        view.down('form').loadRecord(record);
    },

    deleteEmployee: function (row) {
        var record = this.getEmployeesStore().getAt(row);
        if (record) {
            var store = this.getEmployeesStore();
            var allEmployees = this.getAllEmployeesStore();
            store.remove(record);
            store.sync({
                success: function () {
                    allEmployees.load();
                }
            });
        }
    }


});

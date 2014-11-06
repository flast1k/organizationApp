Ext.define('OrganizationApp.controller.Organization', {
    extend: 'Ext.app.Controller',
    requires: 'OrganizationApp.controller.Main',
    stores: ['Organizations'],
    models: ['Organization'],

    refs: [
        {
            ref: 'organizationList',
            selector: '#organization-list'
        },
        {
            ref: 'viewemployeeList',
            selector: '#view-employee-list'
        }
    ],


    init: function () {
        var me = this;
        this.control({
            'button[action=addOrganization]': {
                click: this.addOrganization
            },
            '#organization-list actioncolumn': {
                click: this.onAction
            },
            '#organization-list': {
                itemclick: this.onSelectItem,
                cellclick: {
                    fn: function (table, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
                        if (cellIndex == 0)
                        {
                            me.getController('Main').onDbclickOrganizationListener(record);
                        }
                    }
                }
            },
            'organizationform button[action=save]': {
                click: this.createOrganization
            }

        });
    },

    addOrganization: function () {
        var view = Ext.widget('organizationform');
        view.show();
    },

    createOrganization: function (button) {
        var win = button.up('window');
        var form = win.down('form');

        var store = this.getOrganizationsStore();
        var values = form.getValues();

        var organization = Ext.create('OrganizationApp.model.Organization', values);
        var errors = organization.validate();

        if (errors.isValid()) {
            var formRecord = form.getRecord();

            if (formRecord) {
                // perform update
                formRecord.set(values);
            } else {
                // perform create
                store.add(organization);
            }

            store.sync({
                success: function () {
                    win.close();
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
        var rec = this.getOrganizationsStore().getAt(row);
        if (clsName) {
            switch (clsName[1]) {
                case 'edit':
                    this.editOrganization(row);
                    break;
                case 'delete':
                    this.deleteOrganization(row);
                    break;
            }
        }
    },

    onSelectItem: function (dv, record, item, index, e) {
        var viewEmployeeList = this.getViewemployeeList();
        viewEmployeeList.reconfigure(Ext.create('OrganizationApp.store.Employees'));
        var store = viewEmployeeList.getStore();
        store.buildUrl(record.get('id'));
        store.load(function (records, operation, success) {
            viewEmployeeList.setTitle('Employees of ' + record.get('name') + ' organization');
            viewEmployeeList.show()
        });
    },

    editOrganization: function (row) {
        var record = this.getOrganizationsStore().getAt(row);
        var view = Ext.widget('organizationform');
        view.down('form').loadRecord(record);
    },

    deleteOrganization: function (row) {
        var record = this.getOrganizationsStore().getAt(row);
        if (record) {
            var store = this.getOrganizationsStore();
            store.remove(record);
            store.sync();
        }
    }
});

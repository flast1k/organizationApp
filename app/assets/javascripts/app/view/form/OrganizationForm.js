/**
 * Created with IntelliJ IDEA.
 * User: ubuntu
 * Date: 10/28/14
 * Time: 5:46 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('OrganizationApp.view.form.OrganizationForm', {
    extend: 'Ext.window.Window',
    alias : 'widget.organizationform',
    title : 'Add / Edit Organization',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            items: [{
                xtype: 'hidden',
                name : 'id',
                fieldLabel: 'id'
            }, {
                xtype: 'textfield',
                name : 'name',
                fieldLabel: 'Name'
            }, {
                xtype: 'textfield',
                name : 'site',
                fieldLabel: 'Site'
            }, {
                xtype: 'textfield',
                name : 'description',
                fieldLabel: 'Description'
            }]
        }];

        this.buttons = [{
            text: 'Save',
            action: 'save'
        }, {
            text: 'Cancel',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }
});


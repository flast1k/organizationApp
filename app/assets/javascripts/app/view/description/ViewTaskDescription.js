/**
 * Created with IntelliJ IDEA.
 * User: ubuntu
 * Date: 10/30/14
 * Time: 12:44 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('OrganizationApp.view.description.ViewTaskDescription', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.viewtaskdescription',
    title      : 'Description',
    hidden: true,
    bodyPadding: 5,
    items: [{
        xtype : 'label',
        itemId: 'description-label'
    }]
});
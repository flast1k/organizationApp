/**
 * Created with IntelliJ IDEA.
 * User: ubuntu
 * Date: 10/30/14
 * Time: 3:54 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('OrganizationApp.view.description.TaskDescription', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.taskdescription',
    title: 'Description',
    layout: 'vbox',
    bodyPadding: 5,
    items: [
        {
            xtype: 'label',
            itemId:'name-label'
        },
        {
            xtype: 'label',
            itemId:'description-label'
        },
        {
            xtype: 'label',
            itemId:'spent_time-label'
        },
        {
            xtype: 'label',
            itemId:'status-label'
        },
        {
            xtype: 'label',
            itemId:'owner-label'
        }
    ]
});
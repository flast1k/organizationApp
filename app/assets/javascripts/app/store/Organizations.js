// Models are typically used with a Store, which is basically a collection of Model instances.
Ext.define('OrganizationApp.store.Organizations', {
  extend: 'Ext.data.Store',

  model: 'OrganizationApp.model.Organization',
  autoLoad: true,
  autoSync: false,

  listeners: {
    load: function() {
      console.log(arguments);
    },
    update: function() {
      console.log(arguments);
    },
    beforesync: function() {
      console.log(arguments);
    }
  }
});

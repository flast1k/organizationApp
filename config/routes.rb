Rails.application.routes.draw do
  #get 'welcome/index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  resources :organizations do
    resources :employees, :name_prefix => "organization_"
  end

  resources :employees do
    resources :tasks, :name_prefix => "employee_"
  end

  resources :tasks
  #CRUD API Organizations
  post '/api/organizations', :to => 'organizations#api_create'
  get '/api/organizations', :to => 'organizations#api_index'
  get '/api/organizations/:id', :to => 'organizations#api_show'
  put '/api/organizations/:id', :to => 'organizations#api_update'
  delete '/api/organizations/:id', :to => 'organizations#api_destroy'
  #CRUD API Employees
  post '/api/organization/:organization_id/employees', :to => 'employees#api_create'
  get '/api/organization/:organization_id/employees', :to => 'employees#api_index'
  get '/api/organization/:organization_id/employees/:id', :to => 'employees#api_show'
  put '/api/organization/:organization_id/employees/:id', :to => 'employees#api_update'
  delete '/api/organization/:organization_id/employees/:id', :to => 'employees#api_destroy'
  get '/api/employees', :to => 'employees#api_all_employees'
  #CRUD API Tasks
  post '/api/employee/:employee_id/tasks', :to => 'tasks#api_create'
  get '/api/employee/:employee_id/tasks', :to => 'tasks#api_index'
  get '/api/employee/:employee_id/tasks/:id', :to => 'tasks#api_show'
  put '/api/employee/:employee_id/tasks/:id', :to => 'tasks#api_update'
  delete '/api/employee/:employee_id/tasks/:id', :to => 'tasks#api_destroy'
  get '/api/tasks', :to => 'tasks#api_all_tasks'

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

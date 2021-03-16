Rails.application.routes.draw do
  resources :notes
  resources :maps
  resources :characters
  resources :users
  post "/signup", to: "users#create"
  post "/login", to: "auth#create"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

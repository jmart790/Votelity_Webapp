Rails.application.routes.draw do
  resources :tests
  root 'pages#home'

  resources :candidates, only: [:index]
  resources :profiles, except: [:index]
  resources :categories, only: [:index]

  get '/log_in', to: 'profiles#log_in', as: 'log_in'
  post '/new_session', to: 'profiles#new_session', as: 'new_session'
  get '/logout', to: 'profiles#destroy', as: 'logout' 
  get '/api', to: 'api#index'
 end

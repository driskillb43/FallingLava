Fallinglava::Application.routes.draw do
  root :to => 'falling_lava#new'

  get 'falling_lava', :to => 'falling_lava#new'
  post 'falling_lava/save_score', :to => 'falling_lava#save_score'
end

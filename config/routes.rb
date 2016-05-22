Fallinglava::Application.routes.draw do
  root :to => 'falling_lava#new'

  get 'falling_lava', :to => 'falling_lava#new'
  get 'falling_lava/statistics', :to => 'falling_lava#statistics'
  post 'falling_lava/save_score', :to => 'falling_lava#save_score'
end

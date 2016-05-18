Fallinglava::Application.routes.draw do
  root :to => 'falling_lava#new'

  get 'falling_lava', :to => 'falling_lava#new'
end

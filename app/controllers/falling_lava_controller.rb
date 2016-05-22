class FallingLavaController < ApplicationController
  def new
    render 'falling_lava'
  end

  def save_score
    Score.create(params[:score])
  end
end

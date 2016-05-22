class FallingLavaController < ApplicationController
  def new
    render 'falling_lava'
  end

  def save_score
    Score.create(params[:score])
  end

  def statistics
    scores = Score.all.collect{|row| row[:score]}
    @high_score = scores.max
    @plays = scores.size
    render 'statistics'
  end
end

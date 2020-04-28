class UsersController < ApplicationController
  
  # GET to /user/:id
  def show
    @user = User.find( params[:id])
  end
end
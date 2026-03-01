class AdminController < ApplicationController
  before_action :authenticate_admin!

  def index
    # Admin dashboard logic here
  end
end
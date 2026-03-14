class CheckoutsController < ApplicationController
  def create
    stripe_secret_key = Rails.application.credentials.dig(:stripe, :secret_key)
    Stripe.api_key = stripe_secret_key
  end
end

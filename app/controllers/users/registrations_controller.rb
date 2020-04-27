class Users::RegistrationsController < Devise::RegistrationsController
  
  # Extend default Devise gem behavior so that
  # users signing up with the Pro account (Plan ID 2)
  # save with a specail Stripe subscription function.
  # Otherwise Devise signs up as per usual.
  def create
    super do |resource|
      if params[:plan]
        resource.plan_id = params[:plan]
        if resource.plan_id == 2
          resource.save_with_subscription
        else
          resource.save
        end
      end
    end
  end
end
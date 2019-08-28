class ApplicationController < ActionController::Base
    helper_method :current_profile, :sign_in, :sign_out

    def current_profile
        session[:profile_id] ? Profile.find(session[:profile_id]) : nil
    end
    
    def sign_in(profile)
        session[:profile_id] = profile.id
    end

    def log_out
        session.delete(:profile_id)
    end
end

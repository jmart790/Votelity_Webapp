  class ProfilesController < ApplicationController
    def show
    end

    def new
      @profile = Profile.new
    end

    def log_in
      @profile = Profile.new
    end

    def create
      @profile = Profile.new(profile_params)
  
      respond_to do |format|
        if @profile.save
          format.html { redirect_to @profile, notice: 'Test was successfully created.' }
          format.json { render :show, status: :created, location: @profile }
        else
          format.html { render :new }
          format.json { render json: @profile.errors, status: :unprocessable_entity }
        end
      end
    end

    def new_session
      @profile = Profile.find_by(email: params[:profile][:email])
      if @profile.authenticate( params[:profile][:password] )
        sign_in(@profile)
        redirect_to @profile
      else
        render 'log_in'
      end
    end

     
  def destroy
    session[:profile_id] = nil
    redirect_to '/'
  end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_profile
      @profile = Profile.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def profile_params
      params.require(:profile).permit(:first_name, :last_name, :email, :password)
    end
  end
 
  
  

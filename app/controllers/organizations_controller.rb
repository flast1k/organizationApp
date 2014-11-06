class OrganizationsController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:api_create, :api_index, :api_show, :api_update, :api_destroy]
  def new
    @organization = Organization.new
  end

  def edit
    @organization = Organization.find_by_id(params[:id])
  end

  def index
    @organization = Organization.all
  end

  def create
    @organization = Organization.new(organization_params)

    if @organization.save
      redirect_to @organization
    else
      render 'new'
    end
  end

  def update
    @organization = Organization.find_by_id(params[:id])

    if @organization.update(organization_params)
      redirect_to @organization
    else
      render 'edit'
    end
  end

  def show
    @organization = Organization.find_by_id(params[:id])
  end

  def destroy
    @organization = Organization.find_by_id(params[:id])
    @organization.destroy

    redirect_to organizations_path
  end

  def api_create
    @organization = Organization.new(organization_params)

    if @organization.save
      render :json => {:success => true, :organization => @organization}
    else
      render :json => {:success => false}
    end
  end

  def api_index
    @organization = Organization.all
    render :json => {:success => true, :organization => @organization}
  end



  def api_show
    @organization = Organization.find_by_id(params[:id])
    render :json => {:success => true, :organization => @organization}
  end

  def api_update
    @organization = Organization.find_by_id(params[:id])

    if @organization.update(organization_params)
      render :json => {:success => true, :organization => @organization}
    else
      render :json => {:success => false}
    end
  end

  def api_destroy
    @organization = Organization.find_by_id(params[:id])
    @organization.destroy
    render :json => {:success => true, :organization => @organization}
  end

  private
  def organization_params
    params.require(:organization).permit(:name, :site, :description)
  end

end

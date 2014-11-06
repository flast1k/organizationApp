class EmployeesController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:api_create, :api_index, :api_show, :api_update, :api_destroy]
  def new
    @employee = Employee.new
  end

  def edit
    @employee = Employee.find_by_id(params[:id])
  end

  def index
    @employee = Employee.all
  end

  def create
    @organization = Organization.find_by_id(params[:organization_id])
    @employee = @organization.employees.new(employee_params)

    if @employee.save
      redirect_to organization_path(@organization)
    else
      render 'new'
    end
  end

  def update
    @employee = Employee.find_by_id(params[:id])

    if @employee.update(employee_params)
      redirect_to Organization.find_by_id(@employee.organization_id)
    else
      render 'edit'
    end
  end

  def show
    @employee = Employee.find_by_id(params[:id])
  end

  def destroy
    @employee = Employee.find_by_id(params[:id])
    @employee.destroy

    redirect_to Organization.find_by_id(@employee.organization_id)
  end

  def api_all_employees
    @employee = Employee.all
    render :json => {:success => true, :employee => @employee}
  end

  def api_create
    @employee = Employee.new(employee_params)

    if @employee.save
      render :json => {:success => true, :employee => @employee}
    else
      render :json => {:success => false}
    end
  end

  def api_index
    @employee = Employee.where(:organization_id => params[:organization_id])
    render :json => {:success => true, :employee => @employee}
  end

  def api_show
    @employee = Employee.find_by_id(params[:id])
    render :json => {:success => true, :employee => @employee}
  end

  def api_update
    @employee = Employee.find_by_id(params[:id])

    if @employee.update(employee_params)
      render :json => {:success => true, :employee => @employee}
    else
      render :json => {:success => false}
    end
  end

  def api_destroy
    @employee = Employee.find_by_id(params[:id])
    @employee.destroy
    render :json => {:success => true, :employee => @employee}
  end

  private
  def employee_params
    params.require(:employee).permit(:first_name, :second_name, :phone, :hire_date, :place, :organization_id)
  end
end

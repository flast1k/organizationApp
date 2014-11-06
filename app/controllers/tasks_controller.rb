class TasksController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:api_create, :api_index, :api_show, :api_update, :api_destroy]
  def new
    @task = Task.new
  end

  def edit
    @task = Task.find_by_id(params[:id])
  end

  def index
    @task = Task.all
  end

  def create
    @employee = Employee.find_by_id(params[:employee_id])
    @task = @employee.tasks.new(task_params)

    if @task.save
      redirect_to @task
    else
      render 'new'
    end
  end

  def update
    @task = Task.find_by_id(params[:id])

    if @task.update(task_params)
      redirect_to @task
    else
      render 'edit'
    end
  end

  def show
    @task = Task.find_by_id(params[:id])
  end

  def destroy
    @task = Task.find_by_id(params[:id])
    @task.destroy

    redirect_to Employee.find_by_id(@task.employee_id)
  end

  def api_all_tasks
    @task = Task.all
    render :json => {:success => true, :task => @task}
  end

  def api_create
    @task = Task.new(task_params)

    if @task.save
      render :json => {:success => true, :task => @task}
    else
      render :json => {:success => false}
    end
  end

  def api_index
    @task= Task.where(:employee_id => params[:employee_id])
    render :json => {:success => true, :task => @task}
  end

  def api_show
    @task = Task.find_by_id(params[:id])
    render :json => {:success => true, :task => @task}
  end

  def api_update
    @task = Task.find_by_id(params[:id])

    if @task.update(task_params)
      render :json => {:success => true, :task => @task}
    else
      render :json => {:success => false}
    end
  end

  def api_destroy
    @task = Task.find_by_id(params[:id])
    @task.destroy
    render :json => {:success => true, :task => @task}
  end

  private
  def task_params
    params.require(:task).permit(:name, :description, :spent_time, :status, :employee_id);
  end
end

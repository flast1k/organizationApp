class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.text :description
      t.datetime :spent_time
      t.string :status
      t.references :employee, index: true

      t.timestamps
    end
  end
end

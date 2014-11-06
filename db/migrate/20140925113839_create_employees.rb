class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
      t.string :first_name
      t.string :second_name
      t.string :phone
      t.date :hire_date
      t.string :place
      t.references :organization, index: true

      t.timestamps
    end
  end
end

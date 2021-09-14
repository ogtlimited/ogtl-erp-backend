import seeder from "mongoose-seed";
import dotenv from 'dotenv';
if(process.env.NODE_ENV !== 'production'){
  dotenv.config()
}

// Connect to MongoDB via Mongoose
seeder.connect("mongodb://localhost:27017/mongoose", function() {
 
  // Load Mongoose models
  seeder.loadModels([
    'src/models/loan/loan-type.model.ts'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['LoanType'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'LoanType',
        'documents': [
            {
                'loan_name': 'Stock Loan',
                'maximum_loan_amount': '10000',
                'rate_of_interest': 10,
                'percentage_loan': 10,
                'description': 'This is a standard loan with fixed interest rate',
                'min_stay': 6,
                'disabled': false
            }
        ]
    }
];
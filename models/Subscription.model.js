import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name: {
  type: String,
  required: [true,'Subscription name is required'],
  trim: true,
  minlength: 3,
  maxlength: 90,
 } ,
 price: {
  type: Number,
  required: [true,'price is required'],
  min: [1,'price must be greater than 0'],
 },
 currency:{
  type: String,
  enum: ['INR','USD','GBP'],
  default: 'INR',
},

frequency:{
  type: String,
  required: [true, 'frequency missing'],
  enum: ['daily','weekly','monthly','yearly'],
},

category: {
  type: String,
  enum: ['sports','news','entertainment','lifestyle','technology','other'],
  required: true,
},
paymentMethod: {
  type: String,
  required: true,
  trim:true,
},
status: {
  type: String,
  enum: ['active','cancelled','expired'],
  default: 'active',
},
startDate: {
  type: Date,
  required: true,
  validate: {
    validator: (value) => value <= new Date(),
    message: 'start date must be in the past',
  }
},

renewalDate: {
  type: Date,
  validate: {
    validator: function (value) {
      return value > this.startDate;
    },
    message: 'Renewal date must be after the start date',
  }
},
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true,
  index: true,
}
}, {timestamps: true});


subscriptionSchema.pre('save',function(next){
  if(!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  if(this.renewalDate< new Date()){
    this.status = 'expired';
  }

  next();
});

const Subscription = mongoose.model('Subscription',subscriptionSchema);

export default Subscription;
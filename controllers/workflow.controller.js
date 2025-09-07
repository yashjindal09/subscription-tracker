import dayjs from 'dayjs';

import { createRequire} from 'module';
import Subscription from '../models/Subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');

const REMINDERS = [7,5,2,1];

export const sendReminders = serve(async(context) => {
  const {subscriptionId} = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);
  if(!subscription || subscription.status !== 'active') {
    return;}
  
  const renewalDate = dayjs(subscription.renewalDate);

  if(renewalDate.isBefore(dayjs())) {
    console.log(`Subscription ${subscriptionId} has already renewed. Stopping reminders.`);
    return;
  }

  for(const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');
    if(reminderDate.isAfter(dayjs())) {
      await sleepuntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
    }

    if (dayjs().isSame(reminderDate, 'day')) {
      await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
    }
    
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run('get subscription',async () => {
   const sub = await Subscription.findById(subscriptionId).populate('user','name email');
    if (!sub) return null;

    return sub.toObject({getters: true, virtuals: false});
  })};


const sleepuntilReminder = async(context, label, date) => {
  console.log(`Sleeping until ${label} on ${date}`);
  await context.sleepUntil(label,date.toDate());
}

const triggerReminder = async(context,label,subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering reminder for ${label}`);
    
    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    })


  })
}
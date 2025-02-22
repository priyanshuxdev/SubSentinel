import { createRequire } from 'module';
const require = createRequire(import.meta.url)
const { serve } = require('@upstash/workflow/express');
import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js';
import dayjs from 'dayjs';

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (ctx) => {
    const { subscriptionId } = ctx.requestPayload;

    const subscription = await fetchSubscription(ctx, subscriptionId);

    if (!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscription}. Stopping workflow.`)
        return;
    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day')

        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(ctx, `Reminder ${daysBefore} days before`, reminderDate);
        }

        if (dayjs().isSame(reminderDate, 'day')) {
            await triggerReminder(ctx, `${daysBefore} days before reminder`, subscription);
        }

    }

});


const fetchSubscription = async (ctx, subscriptionId) => {
    return await ctx.run('get subscription', async () => {
        return await Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

const sleepUntilReminder = async (ctx, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`)
    await ctx.sleepUntil(label, date.toDate());
}

const triggerReminder = async (ctx, label, subscription) => {
    return await ctx.run(label, async () => { 
        console.log(`Triggering ${label} reminder`)
        //send emails
        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription
        })
    })
}


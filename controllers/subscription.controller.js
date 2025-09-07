import { workflowClient } from '../config/upstash.config.js';
import Subscription from '../models/Subscription.model.js';
import { SERVER_URL } from '../config/env.js';
export const createsubscription = async (req, res,next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id
    })

    const {workflowRunId} = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    })
    res.status(201).json({
      success: true,
      data: {subscription,workflowRunId},
    });
    
  } catch (error) {
    next(error);
    
  }
  // Implementation for creating a subscription
};

export const getsingleSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found"
      });
    }
    res.status(200).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    next(error);
  }
};
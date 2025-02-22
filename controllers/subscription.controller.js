import Subscription from '../models/subscription.model.js'
import { workflowClient } from '../config/upstash.js'
import { SERVER_URL } from '../config/env.js'

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            }, 
            retries: 0,
        })

        res.status(201).json({success: true, data: {subscription, workflowRunId}})

    } catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => { 
    try {
        if(req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this subscription')
            error.statusCode = 403;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id })

        res.status(200).json({success: true, data: subscriptions})
        
    } catch (error) {
        next(error);
    }
}

export const deleteSubscription = async (req, res, next) => {
    try {

        if(subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('You are not authorised to delete this subscription');
            error.statusCode = 403;
            throw error;
        }

        const subscription = await Subscription.findByIdAndDelete(req.params.id);
         
        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, message: 'Subscription deleted successfully'});
        
    } catch (error) {
        next(error);
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
        // First find the subscription
        const subscription = await Subscription.findById(req.params.id);
        
        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('You are not authorized to update this subscription');
            error.statusCode = 403;
            throw error;
        }

        const updatedSubscription = await Subscription.findByIdAndUpdate(
            req.params.id, 
            { ...req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Subscription updated successfully',
            data: updatedSubscription
        });
    } catch (error) {
        next(error);
    }
}

export const cancelSubscription = async (req, res, next) => {
    try {
        
        if(subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('You are not authorised to cancel this subscription');
            error.statusCode = 403;
            throw error;
        }

        const subscription = await Subscription.findById(req.params.id);

        if(!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }
         
        if(subscription.status === 'cancelled') {
            const error = new Error('Subscription already cancelled');
            error.statusCode = 400;
            throw error;
        }

        subscription.status = 'cancelled';
        await subscription.save();

        res.status(200).json({success: true, message: 'Subscription cancelled successfully'});

    } catch (error) {
        next(error);
    }
}

export const getSubscriptionDetails = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if(!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, data: subscription});
        
    } catch (error) {
        next(error);
    }
}


export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();

        if(!subscriptions) {
            const error = new Error('No subscriptions found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, data: subscriptions});


    } catch (error) {
        next(error);
    }
}

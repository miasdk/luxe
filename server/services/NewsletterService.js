import NewsletterModel from '../models/NewsletterModel.js';

class NewsletterService {
  // Subscribe an email to newsletter
  static async subscribe(email) {
    try {
      // Check if email already exists
      const existingSubscriber = await NewsletterModel.findByEmail(email);
      if (existingSubscriber) {
        throw new Error('Email is already subscribed to newsletter');
      }

      // Add new subscriber
      const newSubscriber = await NewsletterModel.create(email);
      return newSubscriber;
    } catch (error) {
      throw error;
    }
  }

  // Unsubscribe an email from newsletter
  static async unsubscribe(email) {
    try {
      const result = await NewsletterModel.deleteByEmail(email);
      if (!result) {
        throw new Error('Email not found in newsletter subscribers');
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Get all newsletter subscribers
  static async getAllSubscribers() {
    try {
      return await NewsletterModel.getAll();
    } catch (error) {
      throw error;
    }
  }

  // Get subscriber count
  static async getSubscriberCount() {
    try {
      return await NewsletterModel.getCount();
    } catch (error) {
      throw error;
    }
  }
}

export default NewsletterService; 
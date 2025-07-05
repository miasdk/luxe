import NewsletterService from '../services/NewsletterService.js';

class NewsletterController {
  // Subscribe to newsletter
  static async subscribe(req, res) {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
      }

      const result = await NewsletterService.subscribe(email);
      res.status(201).json({ 
        message: 'Successfully subscribed to newsletter',
        data: result 
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      if (error.message.includes('already subscribed')) {
        return res.status(409).json({ message: 'Email is already subscribed' });
      }
      
      res.status(500).json({ message: 'Failed to subscribe to newsletter' });
    }
  }

  // Unsubscribe from newsletter
  static async unsubscribe(req, res) {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      const result = await NewsletterService.unsubscribe(email);
      res.status(200).json({ 
        message: 'Successfully unsubscribed from newsletter',
        data: result 
      });
    } catch (error) {
      console.error('Newsletter unsubscription error:', error);
      
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: 'Email not found in newsletter list' });
      }
      
      res.status(500).json({ message: 'Failed to unsubscribe from newsletter' });
    }
  }

  // Get all newsletter subscribers (admin only)
  static async getAllSubscribers(req, res) {
    try {
      const subscribers = await NewsletterService.getAllSubscribers();
      res.status(200).json(subscribers);
    } catch (error) {
      console.error('Error fetching newsletter subscribers:', error);
      res.status(500).json({ message: 'Failed to fetch newsletter subscribers' });
    }
  }
}

export default NewsletterController; 
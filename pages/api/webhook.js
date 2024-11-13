export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === 'POST') {
    try {
      // Parse the incoming request payload
      const body = req.body;

      // Handle the webhook event
      console.log('Webhook received:', body);

      // Respond to the sender
      res.status(200).json({ message: 'Webhook received successfully' });
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // Return 405 if not a POST request
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}


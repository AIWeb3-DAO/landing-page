import { exec } from 'child_process';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { walletAddress, videoId } = req.body;

    console.log("here we go!");

    if (!walletAddress || !videoId) {
      return res.status(400).json({ error: 'Missing walletAddress or videoId' });
    }
    

    try {
      console.log(`Executing: node ./server/addAddressMetahubEvent.mjs ${walletAddress} ${videoId}`);

      //console.log("node ./server/addAddressMetahubEvent.mjs \"${walletAddress}\" \"${videoId}\"")
      exec(
        `node ./server/addAddressMetahubEvent.mjs \"${walletAddress}\" \"${videoId}\"`,
        { timeout: 1000 }, // Set a timeout to prevent hanging
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Failed to execute script', details: error.message });
          }

          if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).json({ error: 'Error during script execution', details: stderr });
          }

          console.log(`Stdout: ${stdout}`);
          return res.status(200).json({ message: 'Support recorded successfully', output: stdout.trim() });
        }
      );
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Unexpected server error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
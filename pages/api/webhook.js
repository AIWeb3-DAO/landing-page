import { exec } from 'child_process';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'POST') {
    const { identity, questId, taskId } = req.body;
    const { address, email, telegramId, gmail } = identity || {};

    // Validate required fields
    if (!address || !questId || !taskId) {
      return res.status(200).json({ error: 'Missing address, questId, or taskId' });
    }

    try {
      // Construct the command to call the storeMetahub.mjs script
      console.log(`node ./server/storeMetahub.mjs ${address} ${email || ''} ${telegramId || ''} ${gmail || ''} ${questId} ${taskId}`);

      exec(
        `node ./server/storeMetahub.mjs ${address} ${email || ''} ${telegramId || ''} ${gmail || ''} ${questId} ${taskId}`,
        (storeError) => {
          if (storeError) {
            console.error('Error storing data:', storeError.message);
          }
        }
      );

      // Check the first metahub task with taskId
      const command = `node ./server/queryMetahubTask.mjs ${address} ${questId} ${taskId}`;

      let errorDetails = "now running " + command + " ... ";

      exec(command, async (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          const apiResponse = await fetch(
            `https://dac-api.metahub.finance/partners/missionCompleted/${questId}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'api-key': 'DY1u23zHFK9/ULpnDby68C3HwSTdxCZINMnH9yLQxF9r/uxnuSSq++UrA2WZ8hQ5', // Replace with your actual API key
              },
              body: JSON.stringify({
                taskId: taskId,
                identity: address,
                status: false,
                reason: "User did not complete the task",
              }),
            }
          );
          errorDetails = errorDetails + " posted user did not complete the task to metahub .."

          const apiResponseBody = await apiResponse.json();

          if (!apiResponse.ok) {
            console.error("some Errors from the external API:", apiResponseBody);
            //return res.status(200).json({ error: 'Failed to notify external API', details: apiResponseBody });
          }
          errorDetails = errorDetails + " | the response from metahub is " + JSON.stringify(apiResponseBody);;

          return res.status(200).json({ error: 'Address did not finish the task', details: errorDetails });
        }

        // if (stderr) {
        //   console.error(`Stderr: ${stderr}`);
        //   const apiResponse = await fetch(
        //     `https://dac-api.metahub.finance/partners/missionCompleted/${questId}`,
        //     {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //         'api-key': 'DY1u23zHFK9/ULpnDby68C3HwSTdxCZINMnH9yLQxF9r/uxnuSSq++UrA2WZ8hQ5', // Replace with your actual API key
        //       },
        //       body: JSON.stringify({
        //         taskId: taskId,
        //         identity: address,
        //         status: false,
        //         reason: "User did not complete the task",
        //       }),
        //     }
        //   );

        //   const apiResponseBody = await apiResponse.json();

        //   if (!apiResponse.ok) {
        //     console.error("some Errors from the external API:", apiResponseBody);
        //     //return res.status(500).json({ error: 'Failed to notify external API', details: apiResponseBody });
        //   }
        //   return res.status(200).json({ error: 'Address did not finish the task', details: stderr });
        // }

        console.log(`Stdout from queryMetahubTask: ${stdout}`);

        // Make the additional API call
        try {
          const apiResponse = await fetch(
            `https://dac-api.metahub.finance/partners/missionCompleted/${questId}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'api-key': 'DY1u23zHFK9/ULpnDby68C3HwSTdxCZINMnH9yLQxF9r/uxnuSSq++UrA2WZ8hQ5', // Replace with your actual API key
              },
              body: JSON.stringify({
                taskId: taskId,
                identity: address,
                status: true,
                reason: "User already completed the task",
              }),
            }
          );
          errorDetails = errorDetails + " posted user sucessfully completed the task to metahub .."

          const apiResponseBody = await apiResponse.json();

          if (!apiResponse.ok) {
            console.error("Error from the external API:", apiResponseBody);
            //return res.status(500).json({ error: 'Failed to notify external API', details: apiResponseBody });
          }

          console.log("External API response:", apiResponseBody);
          errorDetails = errorDetails + " | the response from metahub is " + JSON.stringify(apiResponseBody);;

          // Return success response
          return res.status(200).json({ message: 'Data stored successfully and API notified', output: errorDetails });
        } catch (apiError) {
          console.error('Error calling the external API:', apiError.message);
          return res.status(200).json({ error: 'Error calling the external API', details: apiError.message });
        }
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(200).json({ error: 'Unexpected server error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(200).json({ error: `Method ${req.method} not allowed` });
  }
}

import { spawn } from 'child_process';

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const { apiKey, startIndex } = req.body;

    if (apiKey !== '@francisxiaobu') {
        return res.status(403).json({ error: 'Unauthorized API Key' });
    }

    // Validate the startIndex parameter
    if (startIndex === undefined || isNaN(parseInt(startIndex, 10)) || parseInt(startIndex, 10) < 0) {
        return res.status(400).json({ error: 'Invalid startIndex. Please provide a valid non-negative number.' });
    }

    const startIndexParam = parseInt(startIndex, 10);

    try {
        // Execute the fetchAllVideos.mjs script with the specified start index
        const fetchProcess = spawn('node', ['./server/fetchAllVideos.mjs', startIndexParam.toString()]);

        let fullData = '';

        // Accumulate data chunks
        fetchProcess.stdout.on('data', (data) => {
            fullData += data.toString();
        });

        fetchProcess.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
        });

        // Ensure entire output is received before parsing
        fetchProcess.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).json({ error: 'Error fetching data' });
            }

            try {
                // Ensure the data is fully received before parsing
                const trimmedData = fullData.trim();
                const jsonData = JSON.parse(trimmedData);
                res.status(200).json(jsonData);
            } catch (error) {
                console.error('Error parsing JSON:', error.message);
                res.status(500).json({ error: 'Invalid JSON format', details: error.message });
            }
        });

    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Unexpected server error', details: error.message });
    }
}

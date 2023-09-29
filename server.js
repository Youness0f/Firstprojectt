const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS to allow requests from different origins (replace 'http://yourfrontendurl.com' with your frontend's URL)
const corsOptions = {
  origin: 'https://firstprojectt.vercel.app/',
  methods: ['POST'],
};
app.use(cors(corsOptions));

// Define an API endpoint for cutting video clips
app.post('/cut-video', (req, res) => {
  const { inputUrl, startTime, endTime } = req.body;

  if (!inputUrl || !startTime || !endTime) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  // Implement video processing logic with FFmpeg here
  // Use ffmpeg() to create an FFmpeg command and specify the input URL, start time, and end time

  const command = ffmpeg(inputUrl)
    .setStartTime(startTime)
    .setDuration(endTime - startTime)
    .output('output.mp4')
    .on('end', () => {
      console.log('Video clip cut and saved.');
      res.json({ message: 'Video clip cut and saved.' });
    })
    .on('error', (err) => {
      console.error('Error cutting video clip:', err);
      res.status(500).json({ error: 'An error occurred while cutting the video clip.' });
    })
    .run();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

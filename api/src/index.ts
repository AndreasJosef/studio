import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log('JobChaser API ONLINE at port: ', PORT);
});

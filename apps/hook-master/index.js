import express from 'express';
import axios from 'axios';
import 'dotenv/config';

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

app.post('/linear', async (req, res) => {
  const { action, data, type } = req.body;

  if (type === 'Issue' && DISCORD_WEBHOOK) {
    const id = data.identifier;
    const title = data.title;
    const url = data.url;
    const state = data.state?.name;

    let content = '';

    if (action === 'create') {
      content = `🆕 **Ny ticket skapad:** [${id}] ${title}\n🔗 ${url}`;
    } else if (action === 'update' && state === 'Done') {
      content = `✅ **Ticket avklarad!** [${id}] ${title}\nSnyggt jobbat team! 🚀`;
    }

    if (content) {
      await axios.post(DISCORD_WEBHOOK, { content }).catch(console.error);
    }
  }

  res.sendStatus(200);
});

// Enkel hälso-check för Caddy
app.get('/health', (req, res) => res.send('Hook Master is alive 🛰️'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Relay active on port ${PORT}`));

import express from 'express';
import axios from 'axios';
import 'dotenv/config';

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK =
  'https://discord.com/api/webhooks/1486014726537478307/a14UgeFlePYGRUYarYgYIUtveD5n_9dr47Z5WbNzu8qJCJVsdX-4OH0qyh3vvuUUsv0d';

app.post('/linear', async (req, res) => {
  const { action, data, type } = req.body;

  console.log(`Action: ${action} \n Type: ${type}`);
  console.log(data);

  if (type === 'Issue' && DISCORD_WEBHOOK) {
    const id = data.identifier;
    const title = data.title;
    const url = data.url;
    const state = data.state?.name;

    let content = '';

    if (action === 'create') {
      if (type === 'ProjectUpdate') {
        console.log('this was a project update');
      }

      content = `**Ny ticket skapad:** [${id}] ${title} -> ${url}`;
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Relay active on port ${PORT}`));

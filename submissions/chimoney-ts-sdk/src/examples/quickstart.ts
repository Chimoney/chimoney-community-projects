import 'dotenv/config';
import { createChimoneyClient } from '../index';

async function main() {
  const apiKey = process.env.CHIMONEY_API_KEY;
  if (!apiKey) {
    throw new Error('Set CHIMONEY_API_KEY in a .env file or environment variable');
  }

  const chimoney = createChimoneyClient({ apiKey, sandbox: true });
  const assets = await chimoney.info.assets();
  console.log('Assets response:', assets);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});



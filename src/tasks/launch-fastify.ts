import { injectDeps } from '#/backend/inject-deps';
import { createFastifyServer } from '#/backend/plugins/fastify/create-server';
import * as procedures from '#/defs/extend/procedures';
import './dotenv';

(async () => {
  const app = injectDeps();
  const sv = await createFastifyServer(procedures, app);
  const host = process.env.HOST ?? 'localhost';
  const port = Number.parseInt(process.env.PORT ?? '3000');
  await sv.listen({ port, host });
  console.log(`Server listening on port http://localhost:${port}`);
})().catch((err) => {
  throw err;
});

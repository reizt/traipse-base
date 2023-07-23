import { injectDeps } from '#/backend/inject-deps';
import * as defs from '#/defs/extend/procedures';
import type { RequestHandler } from '@sveltejs/kit';
import { parseOutput } from '../../api/parse-output';
import { parseRequest } from '../../api/parse-request';
import { makeResponse } from './make-response';
import { parseEvent } from './parse-event';

const app = injectDeps();

export const svelteKitApiHandler: RequestHandler = async (event) => {
  const parsedEvent = await parseEvent(defs, event, '/api');
  if (parsedEvent == null) {
    return new Response(null, { status: 404 });
  }
  const { request, procedureId } = parsedEvent;

  let input: any;
  try {
    input = parseRequest(request, defs[procedureId]);
  } catch (err) {
    console.error(err);
    const body = { message: 'Validation Failed', errors: err };
    return new Response(JSON.stringify(body), { status: 422 });
  }
  const output = await app[procedureId](input);
  const response = parseOutput(output, defs[procedureId]);
  console.log(`[SvelteKit] ${request.method} ${request.path} ${response.status}`);
  return makeResponse(response);
};

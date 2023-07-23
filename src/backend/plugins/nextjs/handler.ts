import { parseOutput } from '#/backend/api/parse-output';
import { parseRequest } from '#/backend/api/parse-request';
import { injectDeps } from '#/backend/inject-deps';
import * as defs from '#/defs/extend/procedures';
import type { NextApiRequest, NextApiResponse } from 'next';
import { decodeApiRequest } from './decode-api-request';
import { handleError } from './handle-error';
import { resolveApiResponse } from './resolve-api-response';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const backend = injectDeps();

  console.log(req.method, req.url);
  try {
    const result = decodeApiRequest(req, defs);
    if (result == null) {
      res.status(404).end();
      return;
    }
    const input = parseRequest(result.request, result.procedure);
    const output = await backend[result.procedureId](input);
    const response = parseOutput(output, result.procedure);
    resolveApiResponse(res, response);
  } catch (err) {
    handleError(res, err);
  }
}

import { makePathRegExp } from '#/backend/api/make-path-regexp';
import type { ApiRequest } from '#/defs/lib/api';
import type { Procedure } from '#/defs/lib/procedure';
import type { NextApiRequest } from 'next';

export const decodeApiRequest = <D extends Record<string, Procedure>>(
  req: NextApiRequest,
  defs: D,
): { request: ApiRequest; procedure: Procedure; procedureId: keyof D } | null => {
  if (req.url == null) {
    throw new Error('No url');
  }
  const path = req.url.replace(/^\/api/, '');
  for (const procedureId in defs) {
    const procedure = defs[procedureId]!;
    if (req.method == null || req.method.toLowerCase() !== procedure.method.toLowerCase()) continue;
    const regexp = makePathRegExp(procedure.path);
    const match = path.match(regexp);
    if (match == null) continue;

    const request: ApiRequest = {
      method: req.method as ApiRequest['method'],
      path: req.url,
      body: req.body,
      query: req.query as Record<string, string>,
      params: (match.groups ?? {}) as Record<string, string>,
      cookies: req.cookies as Record<string, string>,
    };
    return { request, procedure, procedureId };
  }
  return null;
};

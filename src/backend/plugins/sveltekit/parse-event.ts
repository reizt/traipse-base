import type { ApiRequest } from '#/defs/lib/api';
import type { Procedure } from '#/defs/lib/procedure';
import type { RequestEvent } from '@sveltejs/kit';
import { makePathRegExp } from '../../api/make-path-regexp';

export const parseEvent = async <K extends string>(
  defs: Record<K, Procedure>,
  event: RequestEvent,
  prefix?: string,
): Promise<{ request: ApiRequest; procedureId: K } | null> => {
  const method = event.request.method as ApiRequest['method'];
  const cookies: Record<string, string> = {};
  for (const { name, value } of event.cookies.getAll()) {
    cookies[name] = value;
  }
  let path = event.url.pathname;
  if (prefix != null) {
    path = path.replace(new RegExp(`^${prefix}`), '');
  }
  const query = event.params as ApiRequest['query'];
  let body: any;
  try {
    body = await event.request.json();
  } catch {
    body = null;
  }
  for (const procedureId in defs) {
    const procedure = defs[procedureId]!;
    if (method.toLowerCase() !== procedure.method.toLowerCase()) continue;
    const regexp = makePathRegExp(procedure.path);
    const match = path.match(regexp);
    if (match == null) continue;
    const params = match.groups ?? {};
    return {
      procedureId,
      request: { method, cookies, params, path, query, body },
    };
  }
  return null;
};

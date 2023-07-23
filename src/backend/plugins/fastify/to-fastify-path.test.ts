import { toFastifyPath } from './to-fastify-path';

describe(toFastifyPath.name, () => {
  it('converts path to express path', () => {
    expect(toFastifyPath('/users/{id}')).toBe('/users/:id');
    expect(toFastifyPath('/users/{id}/posts/{postId}')).toBe('/users/:id/posts/:postId');
  });
});

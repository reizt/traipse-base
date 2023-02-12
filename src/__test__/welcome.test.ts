import { welcomeMessage } from '#/welcome';
import { describe, expect, test } from 'vitest';

describe(welcomeMessage.name, () => {
  test('retuned message contains project name', () => {
    const projectName = 'Test project';
    const message = welcomeMessage(projectName);
    expect(message.includes(projectName)).toBe(true);
  });
});

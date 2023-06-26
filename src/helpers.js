export const validate = (input) => {
  const commandRegex = new RegExp(/[^\s]+/i);
  const command = input.match(commandRegex)?.[0];
  const validCommands = new Set([
    'add',
    'cat',
    'compress',
    'decompress',
    'cd',
    'cp',
    'hash',
    'ls',
    'mv',
    'os',
    'rm',
    'rn',
    'up',
  ]);

  if (validCommands.has(command)) return true;
  return false;
};

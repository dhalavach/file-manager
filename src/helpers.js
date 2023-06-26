export const validate = (input) => {
  const commandRegex = new RegExp(/[^\s]+/i);
  const command = input.match(commandRegex)[0];
  const validCommands = new Set([
    'cat',
    'compress',
    'decompress',
    'cp',
    'hash',
    'ls',
    'mv',
    'os',
    'rm',
    'rn',
  ]);

  if (validCommands.has(command)) return true;
  return false;
};

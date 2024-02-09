export const assertNever = (value: never): never => {
    throw new Error(`Unhnadled type: ${JSON.stringify(value)}`);
};

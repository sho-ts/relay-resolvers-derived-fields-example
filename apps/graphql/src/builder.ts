import SchemaBuilder from '@pothos/core';
import DirectivePlugin from '@pothos/plugin-directives';
import RelayPlugin from '@pothos/plugin-relay';

export const builder = new SchemaBuilder<{
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    }
  }
}>({
  plugins: [RelayPlugin, DirectivePlugin],
  relay: {},
});

builder.scalarType('DateTime', {
  serialize: (value) => value.toISOString(),
  parseValue: (value) => {
    if (typeof value !== 'string') {
      throw new Error('DateTime must be a string');
    }

    return new Date(value);
  },
})

const User = builder.objectRef<{
  name: string | undefined;
}>('User');

builder.node(User, {
  id: {
    resolve: () => `User:1`,
  },
  fields: (t) => ({
    name: t.exposeString('name'),
    lastLoginAt: t.field({
      type: 'DateTime',
      resolve: () => {
        const now = new Date();
        now.setDate(now.getDate() - 6);

        return now;
      }
    })
  }),
  loadOne: () => ({
    name: 'John'
  })
});

builder.queryType();

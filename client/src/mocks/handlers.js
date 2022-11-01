import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3030/getTestData', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          // TODO: Add mock requests here.
        },
      ])
    );
  }),
];

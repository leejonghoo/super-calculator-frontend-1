import { rest } from 'msw';

export const handlers = [
  rest.post('http://localhost:3001/calc', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ result: '1' }));
  }),

  rest.get('http://localhost:3001/records', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          a: '1',
          b: '2',
          result: '3',
          createdAt: '2021-08-10T10:00:00Z',
        },
      ]),
    );
  }),
];

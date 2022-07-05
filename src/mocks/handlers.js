import { rest } from 'msw';

export const handlers = [
  rest.post('http://localhost:3001/calc', (req, res, ctx) => {
    return res(ctx.status(200), ctx.body('100'));
  }),

  rest.get('http://localhost:3001/records', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          time: '2021-08-10T10:00:00Z',
          expression: '30+1',
          result: '31',
        },
      ]),
    );
  }),
];

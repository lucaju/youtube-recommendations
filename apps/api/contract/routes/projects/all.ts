import { projectSchema } from '@/db/schemas';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const contractProjectAll = c.router(
  {
    projectsAll: {
      method: 'GET',
      path: `/`,
      headers: z.object({
        authorization: z.string(),
      }),
      query: z.object({
        owner: projectSchema.shape.owner.optional(),
        active: z.literal('true').or(z.literal('false')).optional(),
        ephemeral: z.literal('true').or(z.literal('false')).optional(),
      }),
      responses: {
        200: z.array(projectSchema),
        401: c.type<{ message: string }>(),
        500: c.type<{ message: string }>(),
      },
      summary: 'Get all projects. Admin only.',
    },
    projectsStop: {
      method: 'PATCH',
      path: '/stop',
      headers: z.object({
        authorization: z.string(),
      }),
      body: z.object({}),
      responses: {
        200: c.type<{ message: string }>(),
        400: c.type<{ message: string }>(),
        401: c.type<{ message: string }>(),
        500: c.type<{ message: string }>(),
      },
      summary: 'Stop projects',
    },
  },
  {
    pathPrefix: '/all',
  },
);

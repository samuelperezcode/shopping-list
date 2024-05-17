import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const itemsRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1), price: z.number().nonnegative() }))
    .mutation(async ({ ctx, input }) => {

      return ctx.db.item.create({
        data: {
          name: input.name,
          price: input.price
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.item.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});

import { TRPCError } from "@trpc/server";
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
  getById: publicProcedure
  .input(z.object({itemId: z.number()}))
  .query(({ input, ctx }) => {
    const item = ctx.db.item.findUnique({
      where:{
        id: input.itemId
      }
    });

    if(item == null) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message:'Item not found in database'
      })
    }

    return item
  }),
  edit: publicProcedure
    .input(z.object({id: z.number(), name: z.optional(z.string().min(1)), price: z.optional(z.number().nonnegative()) }))
    .mutation(({input,ctx}) => {
      const existingItem = ctx.db.item.findUnique(
        {
          where:{
            id: input.id
          }
        }
      )

      if(existingItem == null){
        throw new TRPCError({
          code:'NOT_FOUND',
          message: 'Item not found in the database'
        })
      }

      return ctx.db.item.update({
        where:{
          id: input.id
        },
        data:{
          name: input.name,
          price: input.price
        }
      })
      
    }),
    delete: publicProcedure
      .input(z.object({id: z.number()}))
      .mutation(({input, ctx}) => {
        const existingItem = ctx.db.item.findUnique(
          {
            where:{
              id: input.id
            }
          }
        )
  
        if(existingItem == null){
          throw new TRPCError({
            code:'NOT_FOUND',
            message: 'Item not found in the database'
          })
        }

        return ctx.db.item.delete({
          where:{
            id: input.id
          },
        })

      })
});

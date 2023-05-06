import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish()
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
        time: new Date()
      }
    }),
  createPost: publicProcedure
    .input(
      z.object({
        content: z.string()
      })
    )
    .query(async ({ input, ctx }) => {
      const createdPost = await ctx.prisma.post.create({
        data: {
          content: input.content
        }
      })

      return createdPost
    }),
  getPosts: publicProcedure
    .query(async ({ ctx }) => {
      const posts = await ctx.prisma.post.findMany()

      return {
        items: posts
      }
    })
})

// export type definition of API
export type AppRouter = typeof appRouter

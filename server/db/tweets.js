import { prisma } from '~/server/db/index'
export const createTweet = (tweetData) => {
  return prisma.tweet.create({
    data: tweetData,
  })
}

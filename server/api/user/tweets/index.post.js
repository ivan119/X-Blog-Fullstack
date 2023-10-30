import formidable from 'formidable'
import { createTweet } from '~/server/db/tweets'
import { tweetTransformer } from '~/server/transformers/tweet'
import { createMediaFile } from '~/server/db/mediaFiles'
import { uploadToCloudinary } from '~/server/utils/cloudinary'

export default defineEventHandler(async (event) => {
  const form = formidable({})
  // TODO: Check why we need extract array from fields
  const response = await new Promise((resolve, reject) => {
    form.parse(event.req, (err, fields, files) => {
      if (err) {
        reject(err)
      }
      resolve({ fields, files })
    })
  })
  const { fields, files } = response
  const userId = event.context?.auth?.user?.id
  const tweetData = {
    text: fields.text[0],
    authorId: userId,
  }

  const replyTo = fields.replyTo
  if (
    replyTo[0].length &&
    replyTo[0] !== 'null' &&
    replyTo[0] !== 'undefined'
  ) {
    tweetData.replyToId = replyTo[0]
  }
  const tweet = await createTweet(tweetData)
  const filePromises = Object.keys(files).map(async (key) => {
    const file = files[key][0]
    const cloudinaryResource = await uploadToCloudinary(file.filepath)
    return createMediaFile({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      userId: userId,
      tweetId: tweet.id,
    })
  })
  await Promise.all(filePromises)
  return {
    tweet: tweetTransformer(tweet),
  }
})

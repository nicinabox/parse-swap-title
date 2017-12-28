const patterns = {
  allTags: /\[[^\]]*[^\[]*/g,
  tag: /\[(.*)\]\s?(.*)/,
}

export default (raw) => {
  let tags = raw.match(patterns.allTags)

  if (!tags) {
    throw new Error('Could not match any tags')
  }

  return tags.map((str) => {
    const [, tag, value] = str.trim().match(patterns.tag)
    return { tag, value }
  })
}

import parseTags from './parseTags'

const tagExpansions = {
  W: 'want',
  H: 'have',
  GB: 'group_buy',
  IC: 'interest_check',
}

const patterns = {
  location: /^(?!IC|GB\b)(\w{2,3})(?:-(\w{2}))?$/g,
  money: /cash|paypal|\$|google w|ltc|btc|bitcoin|money/i,
}

const getLocation = (tag) => {
  let location = patterns.location.exec(tag)

  if (location) {
    return {
      zone: location[1],
      region: location[2] || null,
    }
  }
}

const getType = ({ have, want, type }) => {
  if (isMoney(want)) return 'selling'
  if (isMoney(have)) return 'buying'
  return type
}

const expandTag = (tag) => tagExpansions[tag.toUpperCase()] || tag.toLowerCase()

const isMoney = (value) => patterns.money.test(value)

const transformTag = (tag, value) => {
  const location = getLocation(tag)
  const key = expandTag(tag)

  if (location) {
    return location
  }

  return {
    [key]: value,
    type: key,
  }
}

export default (raw) => {
  const tags = parseTags(raw)

  let result = tags.reduce((acc, {tag, value}) => ({
    ...acc,
    ...transformTag(tag, value),
  }), {})

  result = {
    ...result,
    type: getType(result)
  }

  return result
}

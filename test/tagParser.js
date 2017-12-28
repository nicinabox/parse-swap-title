import expect from 'unexpected'
import parseTags from '../src/parseTags'

describe('parseTags', () => {
  it('parses single tags', () => {
    expect(
      parseTags('[US-TN]'),
      'to equal',
      [{
        tag: 'US-TN',
        value: ''
      }]
    )
  })

  it('parses tags with a value', () => {
    expect(
      parseTags('[W] Paypal'),
      'to equal',
      [{
        tag: 'W',
        value: 'Paypal'
      }]
    )
  })

  it('parses multiple tags in a string', () => {
    expect(
      parseTags('[US-TN] [W] Paypal [H] Iris'),
      'to equal',
      [
        {
          tag: 'US-TN',
          value: ''
        },
        {
          tag: 'W',
          value: 'Paypal'
        },
        {
          tag: 'H',
          value: 'Iris'
        }
      ]
    )
  })

  it('throws if unable to parse tags', () => {
    expect(() => parseTags('nope'), 'to throw')
  })
})

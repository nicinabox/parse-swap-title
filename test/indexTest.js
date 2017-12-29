import expect from 'unexpected'
import parse from '../src/index'

describe('parse', () => {
  it('is a function', () => {
    expect(parse, 'to be a function')
  })

  describe('2 letter countries', () => {
    it('US', () => {
      const result = parse('[US-MI] [H] Paypal [W] KUL ES-87')
      expect(result, 'to satisfy', {
        zone: 'US',
      })
    })

    it('CA', () => {
      const result = parse('[CA-QC] [H] ZZ96 [W] Paypal')
      expect(result, 'to satisfy', {
        zone: 'CA'
      })
    })

    it('EU', () => {
      const result = parse('[EU-DE] [H] ZZ96 [W] Paypal')
      expect(result, 'to satisfy', {
        zone: 'EU'
      })
    })

    it('other countries', () => {
      const result = parse('[CN] [H] Artisans, Keyboards, Keycaps [W] Paypal')
      expect(result, 'to satisfy', {
        zone: 'CN'
      })
    })
  })

  describe('3 letter countries', () => {
    it('USA', () => {
      const result = parse('[USA-MI] [H] Paypal [W] KUL ES-87')
      expect(result, 'to satisfy', {
        zone: 'USA'
      })
    })

    it('CAN', () => {
      const result = parse('[CAN-BC] [H] Paypal [W] KUL ES-87')
      expect(result, 'to satisfy', {
        zone: 'CAN'
      })
    })

    it('GBR', () => {
      const result = parse('[GBR] [H] Paypal [W] KUL ES-87')
      expect(result, 'to satisfy', {
        zone: 'GBR'
      })
    })

    it('AUS', () => {
      const result = parse('[AUS] [H] Paypal [W] KUL ES-87')
      expect(result, 'to satisfy', {
        zone: 'AUS'
      })
    })

    it('GER', () => {
      const result = parse('[GER] [H] Paypal [W] KUL ES-87')
      expect(result, 'to satisfy', {
        zone: 'GER'
      })
    })
  })

  describe('2 letter areas', () => {
    it('UK', () => {
      const result = parse('[EU-UK] [H] ZZ96 [W] Paypal')
      expect(result, 'to satisfy', {
        region: 'UK'
      })
    })

    it('states', () => {
      const result = parse('[US-MI] [H] ZZ96 [W] Paypal')
      expect(result, 'to satisfy', {
        region: 'MI'
      })
    })

    it('provinces', () => {
      const result = parse('[CA-BC] [H] ZZ96 [W] Paypal')
      expect(result, 'to satisfy', {
        region: 'BC'
      })
    })
  })

  it('have', () => {
    const result = parse('[US-IA] [H] ZZ96 [W] Paypal')
    expect(result, 'to satisfy', {
      have: 'ZZ96',
      type: 'selling'
    })
  })

  it('want', () => {
    const result = parse('[US-MI] [H] Paypal [W] Gateron Blues')
    expect(result, 'to satisfy', {
      want: 'Gateron Blues',
      type: 'buying'
    })
  })

  it('trade', () => {
    const result = parse('[US-ME][H] GMK Skidolcha [W] other GMK keyset')
    expect(result, 'to satisfy', {
      want: 'other GMK keyset',
      have: 'GMK Skidolcha',
      type: 'trading'
    })
  })

  it('meta', () => {
    const result = parse('[META] Scam by u/Maximum6')
    expect(result, 'to satisfy', {
      meta: 'Scam by u/Maximum6',
      type: 'meta'
    })
  })

  it('interest check', () => {
    const result = parse('[IC] FC750r PD in Sky Dolch w/ Hangul Sublegends')
    expect(result, 'to satisfy', {
      interest_check: 'FC750r PD in Sky Dolch w/ Hangul Sublegends',
      type: 'interest_check'
    })
  })

  it('group buy', () => {
    const result = parse('[GB] GMK Blue on Black - GB period extended!')
    expect(result, 'to satisfy', {
      group_buy: 'GMK Blue on Black - GB period extended!',
      type: 'group_buy',
    })
  })

  it('artisan', () => {
    const result = parse('[Artisan] Massive New year sale on every A.M.K.🎉🎊🎅')
    expect(result, 'to satisfy', {
      artisan: 'Massive New year sale on every A.M.K.🎉🎊🎅',
      type: 'artisan',
    })
  })

  it('vendor', () => {
    const result = parse('[Vendor] Last few hours for 10% off at SwitchSource.ca Ends tonight @ Midnight PST!')
    expect(result, 'to satisfy', {
      vendor: 'Last few hours for 10% off at SwitchSource.ca Ends tonight @ Midnight PST!',
      type: 'vendor',
    })
  })

  it('giveaway', () => {
    const result = parse('[Giveaway] DO60 PCB - a PCB for custom 60% keyboard')
    expect(result, 'to satisfy', {
      giveaway: 'DO60 PCB - a PCB for custom 60% keyboard',
      type: 'giveaway',
    })
  })

  it('handles double tags', () => {
    const result = parse('[Vendor][GB] R9 Zilents / Zealios / Tealios / Zealencios / Z-Stabilizers Preorder Now Live!')
    expect(result, 'to satisfy', {
      type: 'group_buy'
    })
  })
})

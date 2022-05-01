const { isValid } = require('../utils/isValid')
const { errorMessage } = require('../config')

describe('validate user input', () => {
  describe('first name', () => {
    it('first name is number', () => {
      isValid({ first_name: 5 }).then((data) => {
        expect(data.error).toMatch('first_name')
      })
    })
    it('first name contains illegal character ', () => {
      isValid({ first_name: 'a][d' }).then((data) => {
        expect(data.error).toMatch('first_name')
      })
    })
    it('first name length less than 3 ', async () => {
      let aa
      await isValid({ first_name: 'a2' }).then((data) => {
        aa = data
        //console.log(aa)
      })
      expect(aa.error).toMatch('first_name')
    })
    it('first name normal ', async () => {
      let aa
      await isValid({ first_name: 'a2jk' }).then((data) => {
        //console.log(aa)
        aa = data
      })
      expect(aa.error).not.toMatch('first_name')
    })
  })
  describe('last name', () => {
    it('last name is number', () => {
      isValid({ first_name: 'a2kl', last_name: 5 }).then((data) => {
        expect(data.error).toMatch('last_name')
      })
    })
    it('last name contains illegal character ', () => {
      isValid({ first_name: 'a2kl', last_name: 'a][d' }).then((data) => {
        expect(data.error).toMatch('last_name')
      })
    })
    it('last name length less than 3 ', async () => {
      let aa
      await isValid({ first_name: 'a2kl', last_name: 'a2' }).then((data) => {
        aa = data
      })
      expect(aa.error).toMatch('last_name')
    })
    it('last name normal ', async () => {
      let aa
      await isValid({
        first_name: 'a2kl',
        last_name: 'a2gf',
        check_in: '2-12-2012',
        check_out: '2-14-2012',
        number_people: 2,
        email: 'ddd@kkk.com',
      }).then((data) => {
        aa = data
      })
      //expect(aa.error).not.toBeDefined()
      if (aa.error) expect(aa.error).not.toMatch('last_name')
    })
  })
  describe('check in and check out', () => {
    it('check in date format wrong ', async () => {
      let aa
      await isValid({
        first_name: 'a2kl',
        last_name: 'a2gf',
        check_in: 'k',
        check_out: '2-15-2023',
      }).then((data) => {
        aa = data
      })
      expect(aa.error).toMatch('check_in')
      //expect(aa.error).not.toMatch('check_out')
    })
    it('check in date should greater than now ', async () => {
      let aa
      await isValid({
        first_name: 'a2kl',
        last_name: 'a2gf',
        check_in: '2-12-2022',
        check_out: '2-15-2023',
      }).then((data) => {
        aa = data
      })
      expect(aa.error).toMatch('check_in')
      //expect(aa.error).not.toMatch('check_out')
    })
    it('check out date format wrong ', async () => {
      let aa
      await isValid({
        first_name: 'a2kl',
        last_name: 'a2gf',
        check_in: '2-12-2023',
        check_out: 'g',
      }).then((data) => {
        aa = data
      })
      expect(aa.error).toMatch('check_out')
    })
    it('check out date should greater than check in date', async () => {
      let aa
      await isValid({
        first_name: 'a2kl',
        last_name: 'a2gf',
        check_in: '2-12-2023',
        check_out: '2-12-2023',
      }).then((data) => {
        aa = data
      })
      expect(aa.error).toMatch('check_out')
    })
  })
  describe('number of people', () => {
    it('no people', async () => {
      let aa
      await isValid({
        first_name: 'a2kl',
        last_name: 'a2gf',
        check_in: '2-12-2023',
        check_out: '2-14-2023',
        number_people: 0,
      }).then((data) => {
        aa = data
      })
      expect(aa.error).toMatch('number_people')
    })
    it('people more than 3', async () => {
      let aa
      await isValid({
        first_name: 'a2kl',
        last_name: 'a2gf',
        check_in: '2-12-2023',
        check_out: '2-14-2023',
        number_people: 4,
      }).then((data) => {
        aa = data
      })
      expect(aa.error).toMatch('number_people')
    })
  })
  describe('email test', () => {
    it('email format wrong1', async () => {
      let aa
      await isValid({
        first_name: 'a2kl',
        last_name: 'a2gf',
        check_in: '2-12-2023',
        check_out: '2-14-2023',
        number_people: 2,
        email: 'lll',
      }).then((data) => {
        aa = data
      })
      expect(aa.error).toMatch('email')
    })
    it('email format wrong2', async () => {
      let aa
      await isValid({
        first_name: 'a2kl',
        last_name: 'a2gf',
        check_in: '2-12-2023',
        check_out: '2-14-2023',
        number_people: 2,
        email: 'lll@hhh.lll',
      }).then((data) => {
        aa = data
      })
      expect(aa.error).toMatch('email')
    })
    it('email format wrong3', async () => {
      let aa
      await isValid({
        first_name: 'a2kl',
        last_name: 'a2gf',
        check_in: '2-12-2023',
        check_out: '2-14-2023',
        number_people: 2,
        email: 'lll.hhh.com',
      }).then((data) => {
        aa = data
      })
      expect(aa.error).toMatch('email')
    })
  })
})

describe('check stay period', () => {
  let reservations = [
    {
      first_name: 'cell',
      last_name: 'kou',
      number_people: '2',
      check_in: '4-10-2023',
      check_out: '4-13-2023',
      email: 'lll@rrr.com',
    },
  ]

  it('test check_in date conflict', async () => {
    let q = {
      first_name: 'a2kl',
      last_name: 'a2gf',
      number_people: 2,
      check_in: '4-11-2023',
      check_out: '4-13-2023',
      number_people: 2,
      email: 'ddd@kkk.com',
    }
    let aa
    await isValid(q, reservations).then((data) => {
      aa = data
      //console.log(aa)
    })
    expect(aa.error).toBeDefined()
  })
  it('test check_out date conflict', async () => {
    let q = {
      first_name: 'a2kl',
      last_name: 'a2gf',
      number_people: 2,
      check_in: '4.9-2023',
      check_out: '4-11-2023',
      number_people: 2,
      email: 'ddd@kkk.com',
    }
    let aa
    await isValid(q, reservations).then((data) => {
      aa = data
      //console.log(aa)
    })
    expect(aa.error).toBeDefined()
  })
  it('test both check_in and check_out date conflict', async () => {
    let q = {
      first_name: 'a2kl',
      last_name: 'a2gf',
      number_people: 2,
      check_in: '4.11-2023',
      check_out: '4-12-2023',
      number_people: 2,
      email: 'ddd@kkk.com',
    }
    let aa
    await isValid(q, reservations).then((data) => {
      aa = data
      //console.log(aa)
    })
    expect(aa.error).toBeDefined()
  })
  it('stay period more than 3 days', async () => {
    let aa
    await isValid(
      {
        first_name: 'a2kl',
        last_name: 'a2gf',
        check_in: '2-12-2023',
        check_out: '2-19-2023',
        number_people: 2,
        email: 'lll@hhh.com',
      },
      reservations
    ).then((data) => {
      aa = data
      //console.log(aa)
    })
    expect(aa.error).toMatch(errorMessage.incorrectdays)
  })
})

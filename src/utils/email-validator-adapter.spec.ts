
import { EmailValidatorAdapter } from './email-validator-adapter'
describe('Email Validator Adapter ', () => {
  test('should return if validator returns false ', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
})

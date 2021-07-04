/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpRequest, HttpResponse, Controller, EmailValidator, IAddAccount } from './signup-protocol'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { InvalidParamsError, MissingParamsError } from '../../error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: IAddAccount
  constructor (emailValidator: EmailValidator, addAccount: IAddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const compulsoryField = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of compulsoryField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamsError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamsError('email'))
      }
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}

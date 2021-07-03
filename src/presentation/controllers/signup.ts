/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpRequest, HttpResponse } from '../protocol/http'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller, EmailValidator } from '../protocol'
import { InvalidParamsError, MissingParamsError } from '../error'
import { IAddAccount } from '../../domain/usecase/add-account'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: IAddAccount
  constructor (emailValidator: EmailValidator, addAccount: IAddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
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
      this.addAccount.add({
        name,
        email,
        password
      })
      return {
        statusCode: 200,
        body: 'Ok'
      }
    } catch (error) {
      return serverError()
    }
  }
}

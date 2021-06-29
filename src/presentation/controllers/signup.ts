/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpRequest, HttpResponse } from '../protocol/http'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller, EmailValidator } from '../protocol'
import { InvalidParamsError, MissingParamsError } from '../error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const compulsoryField = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of compulsoryField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }
      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamsError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamsError('email'))
      }
      return {
        statusCode: 200,
        body: 'Ok'
      }
    } catch (error) {
      return serverError()
    }
  }
}

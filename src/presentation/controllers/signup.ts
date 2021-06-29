/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpRequest, HttpResponse } from '../protocol/http'
import { MissingParamsError } from '../error/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocol/controller'
import { EmailValidator } from '../protocol/email-validator'
import { InvalidParamsError } from '../error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const compulsoryField = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of compulsoryField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(field))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new InvalidParamsError('email'))
    }
    return {
      statusCode: 200,
      body: 'Ok'
    }
  }
}

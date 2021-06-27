/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpRequest, HttpResponse } from '../protocol/http'
import { MissingParamsError } from '../error/missing-param-error'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const compulsoryField = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of compulsoryField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(field))
      }
    }

    return {
      statusCode: 200,
      body: 'Ok'
    }
  }
}

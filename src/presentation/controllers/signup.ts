/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { HttpRequest, HttpResponse } from '../protocol/http'
import { MissingParamsError } from '../error/missing-param-error'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamsError('name'))
    } else if (!httpRequest.body.email) {
      return badRequest(new MissingParamsError('email'))
    } else {
      return {
        statusCode: 200,
        body: 'Ok'
      }
    }
  }
}

import { IAccountModel } from '../../../domain/models/account'
import { IAddAccount, IAddAccountModel } from '../../../domain/usecase/add-account'
import { Encrypter } from '../../protocols/encrypter'
export class DbAddAccount implements IAddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: IAddAccountModel): Promise<IAccountModel> {
    await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => resolve(account))
  }
}

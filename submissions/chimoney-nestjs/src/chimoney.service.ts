import { Inject, Injectable } from '@nestjs/common';
import { Config } from './config';
import { CONFIG_OPTIONS } from './constants';
import {
  AccountTransferDto,
  DeleteUnpaidTransactionDto,
  TransactionByIDDto,
  TransactionsByIssueIDDto,
} from './dto/account';
import { AccountService } from './services/account';
@Injectable()
export class ChimoneyClientService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly config: Config,
    private readonly transactionsServices: AccountService,
  ) {
    if (!config.apiKey) {
      throw new Error('Please provide api key');
    }
  }
  getTransactionsByIssueID(data: TransactionsByIssueIDDto): Promise<any> {
    return this.transactionsServices.getTransactionsByIssueID(data);
  }
  getAllTransactions(subAccount: string | null): Promise<any> {
    return this.transactionsServices.getAllTransactions(subAccount);
  }
  getTransactionByID(data: TransactionByIDDto): Promise<any> {
    return this.transactionsServices.getTransactionByID(data);
  }

  accountTransfer(data: AccountTransferDto): Promise<any> {
    return this.transactionsServices.accountTransfer(data);
  }
  deleteUnpaidTransaction(data: DeleteUnpaidTransactionDto): Promise<any> {
    return this.transactionsServices.deleteUnpaidTransaction(data);
  }
}

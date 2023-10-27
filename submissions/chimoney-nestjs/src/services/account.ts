import { Inject, Injectable } from '@nestjs/common';
import { Axios } from 'axios';
import { errorHandler } from '../utils/errorHandler';
import {
  AccountTransferDto,
  DeleteUnpaidTransactionDto,
  TransactionByIDDto,
  TransactionsByIssueIDDto,
} from 'src/dto/account';
import { AXIOS_INSTANCE } from '../../src/constants';

@Injectable()
export class AccountService {
  constructor(@Inject(AXIOS_INSTANCE) private readonly request: Axios) {}

  async getTransactionsByIssueID({
    issueID,
    subAccount,
  }: TransactionsByIssueIDDto) {
    try {
      const response = await this.request.post(
        `accounts/issue-id-transactions?issueID=${issueID}`,
        { subAccount },
      );

      return { data: response.data, status: response.status };
    } catch (error) {
      return errorHandler(error);
    }
  }
  async getAllTransactions(subAccount: string | null = null) {
    try {
      const response = await this.request.post(`accounts/transactions`, {
        subAccount,
      });

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }

  async getTransactionByID({ transactionId, subAccount }: TransactionByIDDto) {
    try {
      const response = await this.request.post(
        `accounts/transaction?id=${transactionId}`,
        {
          subAccount,
        },
      );

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }

  async accountTransfer(data: AccountTransferDto) {
    try {
      const response = await this.request.post(`accounts/transfer`, data);

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
  async deleteUnpaidTransaction(data: DeleteUnpaidTransactionDto) {
    try {
      let url = `accounts/delete-unpaid-transaction?chiRef=${data.chiRef}`;
      if (data.subAccount) {
        url = url + `&subAccount=${data.subAccount}`;
      }
      const response = await this.request.delete(url);

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  }
}

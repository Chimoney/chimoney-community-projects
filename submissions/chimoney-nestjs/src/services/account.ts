import { Inject, Injectable } from '@nestjs/common';
import { Axios, HttpStatusCode } from 'axios';
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
        `/v0.2/accounts/issue-id-transactions?issueID=${issueID}`,
        { subAccount },
      );

      return { data: response.data, status: response.status };
    } catch (error) {
      const message = error.response ? error.response.data : error.message;
      const status = error?.response?.status
        ? error.response.status
        : error.code || HttpStatusCode.InternalServerError;
      return {
        error: message,
        status,
      };
    }
  }
  async getAllTransactions(subAccount: string | null = null) {
    try {
      const response = await this.request.post(`/v0.2/accounts/transactions`, {
        subAccount,
      });

      return response.data;
    } catch (error) {
      const message = error.response ? error.response.data : error.message;
      const status = error?.response?.status
        ? error.response.status
        : error.code || HttpStatusCode.InternalServerError;
      return {
        error: message,
        status,
      };
    }
  }

  async getTransactionByID({ transactionId, subAccount }: TransactionByIDDto) {
    try {
      const response = await this.request.post(
        `/v0.2/accounts/transaction?id=${transactionId}`,
        {
          subAccount,
        },
      );

      return response.data;
    } catch (error) {
      const message = error.response ? error.response.data : error.message;
      throw new HttpException(
        message,
        error.code || HttpStatusCode.InternalServerError,
      );
    }
  }

  async accountTransfer(data: AccountTransferDto) {
    try {
      const response = await this.request.post(`/v0.2/accounts/transfer`, data);

      return response.data;
    } catch (error) {
      const message = error.response ? error.response.data : error.message;
      throw new HttpException(
        message,
        error.code || HttpStatusCode.InternalServerError,
      );
    }
  }
  async deleteUnpaidTransaction(data: DeleteUnpaidTransactionDto) {
    try {
      let url = `/v0.2/accounts/delete-unpaid-transaction?chiRef=${data.chiRef}`;
      if (data.subAccount) {
        url = url + `&subAccount=${data.subAccount}`;
      }
      const response = await this.request.delete(url);

      return response.data;
    } catch (error) {
      const message = error.response ? error.response.data : error.message;
      throw new HttpException(
        message,
        error.code || HttpStatusCode.InternalServerError,
      );
    }
  }
}

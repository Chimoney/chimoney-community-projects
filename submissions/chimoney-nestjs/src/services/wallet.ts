import { Inject, Injectable } from '@nestjs/common';
import { Axios } from 'axios';

import { WalletByIDDto, WalletTransferIDDto } from 'src/dto/wallet';
import { errorHandler } from 'src/utils/errorHandler';
import { AXIOS_INSTANCE } from '../constants';

@Injectable()
export class WalletsService {
  constructor(@Inject(AXIOS_INSTANCE) private readonly request: Axios) {}

  async getWallets(subAccount: string | null) {
    try {
      const response = await this.request.post('wallets/list', {
        subAccount,
      });

      return { data: response.data, status: response.status };
    } catch (error) {
      return errorHandler(error);
    }
  }
  async getWallet(data: WalletByIDDto) {
    try {
      const response = await this.request.post('wallets/lookup', data);

      return { data: response.data, status: response.status };
    } catch (error) {
      return errorHandler(error);
    }
  }

  async transferWallet(data: WalletTransferIDDto) {
    try {
      const response = await this.request.post('wallets/transfer', data);

      return { data: response.data, status: response.status };
    } catch (error) {
      return errorHandler(error);
    }
  }
}

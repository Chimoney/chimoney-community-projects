import { HttpClient } from "./http";
import { createInfoModule, InfoModule } from "../modules/info/info";
import { createPayoutsModule, PayoutsModule } from "../modules/payouts/payouts";
import { createWalletModule, WalletModule } from "../modules/wallet/wallet";
import { createAccountModule, AccountModule } from "../modules/account/account";
import { createRedeemModule, RedeemModule } from "../modules/redeem/redeem";
import { createMobileMoneyModule, MobileMoneyModule } from "../modules/mobile-money/mobile-money";
import { createSubAccountModule, SubAccountModule } from "../modules/sub-account/sub-account";

export interface ChimoneyClientOptions {
  apiKey: string;
  sandbox?: boolean;
  baseUrlOverride?: string;
}

export interface ChimoneyClient {
  info: InfoModule;
  payouts: PayoutsModule;
  wallet: WalletModule;
  account: AccountModule;
  redeem: RedeemModule;
  mobileMoney: MobileMoneyModule;
  subAccount: SubAccountModule;
}

export function createChimoneyClient(options: ChimoneyClientOptions): ChimoneyClient {
  const http = new HttpClient({
    apiKey: options.apiKey,
    sandbox: options.sandbox,
    baseUrlOverride: options.baseUrlOverride,
  });

  return {
    info: createInfoModule(http),
    payouts: createPayoutsModule(http),
    wallet: createWalletModule(http),
    account: createAccountModule(http),
    redeem: createRedeemModule(http),
    mobileMoney: createMobileMoneyModule(http),
    subAccount: createSubAccountModule(http),
  };
}



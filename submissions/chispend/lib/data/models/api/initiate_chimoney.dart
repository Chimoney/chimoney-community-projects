import 'dart:convert';

InitiateChimoneyRes initiateChimoneyResFromMap(String str) => InitiateChimoneyRes.fromMap(json.decode(str));

class InitiateChimoneyRes {
  InitiateChimoneyRes({
    required this.status,
    required this.data,
  });

  String status;
  Data data;

  factory InitiateChimoneyRes.fromMap(Map<String, dynamic> json) => InitiateChimoneyRes(
    status: json["status"],
    data: Data.fromMap(json["data"]),
  );
}

class Data {
  Data({
    required this.paymentLink,
    required this.data,
    required this.error,
    required this.cryptoPayment,
  });

  String paymentLink;
  List<Datum> data;
  String error;
  CryptoPayment cryptoPayment;

  factory Data.fromMap(Map<String, dynamic> json) => Data(
    paymentLink: json["paymentLink"],
    data: List<Datum>.from(json["data"].map((x) => Datum.fromMap(x))),
    error: json["error"],
    cryptoPayment: CryptoPayment.fromMap(json["cryptoPayment"]),
  );
}

class CryptoPayment {
  CryptoPayment({
    required this.xrpl,
    required this.eth,
    required this.bsc,
  });

  Xrpl xrpl;
  Bsc eth;
  Bsc bsc;

  factory CryptoPayment.fromMap(Map<String, dynamic> json) => CryptoPayment(
    xrpl: Xrpl.fromMap(json["xrpl"]),
    eth: Bsc.fromMap(json["eth"]),
    bsc: Bsc.fromMap(json["bsc"]),
  );
}

class Bsc {
  Bsc({
    required this.acceptedTokens,
    required this.address,
    required this.deliveAmount,
  });

  List<String> acceptedTokens;
  String address;
  DeliveAmount deliveAmount;

  factory Bsc.fromMap(Map<String, dynamic> json) => Bsc(
    acceptedTokens: List<String>.from(json["acceptedTokens"].map((x) => x)),
    address: json["address"],
    deliveAmount: DeliveAmount.fromMap(json["deliveAmount"]),
  );
}

class DeliveAmount {
  DeliveAmount({
    required this.value,
    required this.currency,
  });

  int value;
  String currency;

  factory DeliveAmount.fromMap(Map<String, dynamic> json) => DeliveAmount(
    value: json["value"],
    currency: json["currency"],
  );
}

class Xrpl {
  Xrpl({
    required this.acceptedTokens,
    required this.address,
    required this.deliveAmount,
    required this.paymentInstruction,
    required this.xummPayloads,
  });

  List<String> acceptedTokens;
  String address;
  DeliveAmount deliveAmount;
  String paymentInstruction;
  XummPayloads xummPayloads;

  factory Xrpl.fromMap(Map<String, dynamic> json) => Xrpl(
    acceptedTokens: List<String>.from(json["acceptedTokens"].map((x) => x)),
    address: json["address"],
    deliveAmount: DeliveAmount.fromMap(json["deliveAmount"]),
    paymentInstruction: json["paymentInstruction"],
    xummPayloads: XummPayloads.fromMap(json["xummPayloads"]),
  );
}

class XummPayloads {
  XummPayloads();

  factory XummPayloads.fromMap(Map<String, dynamic> json) => XummPayloads(
  );
}

class Datum {
  Datum({
    required this.id,
    required this.status,
    required this.issuer,
    required this.initiatedBy,
    required this.valueInUsd,
    required this.enabledToRedeem,
    required this.issueDate,
    required this.chimoney,
    required this.issueId,
    required this.chiRef,
    required this.integration,
    required this.email,
  });

  String id;
  String status;
  String issuer;
  String initiatedBy;
  int valueInUsd;
  List<String> enabledToRedeem;
  DateTime issueDate;
  int chimoney;
  String issueId;
  String chiRef;
  Integration integration;
  String email;

  factory Datum.fromMap(Map<String, dynamic> json) => Datum(
    id: json["id"],
    status: json["status"],
    issuer: json["issuer"],
    initiatedBy: json["initiatedBy"],
    valueInUsd: json["valueInUSD"],
    enabledToRedeem: List<String>.from(json["enabledToRedeem"].map((x) => x)),
    issueDate: DateTime.parse(json["issueDate"]),
    chimoney: json["chimoney"],
    issueId: json["issueID"],
    chiRef: json["chiRef"],
    integration: Integration.fromMap(json["integration"]),
    email: json["email"],
  );
}

class Integration {
  Integration({
    required this.appId,
  });

  String appId;

  factory Integration.fromMap(Map<String, dynamic> json) => Integration(
    appId: json["appID"],
  );
}

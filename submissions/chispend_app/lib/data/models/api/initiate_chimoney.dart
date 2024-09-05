import 'dart:convert';

InitiateChimoneyRes initiateChimoneyResFromMap(String str) => InitiateChimoneyRes.fromMap(json.decode(str));

class InitiateChimoneyRes {
  InitiateChimoneyRes({
    required this.data,
  });

  Data data;

  factory InitiateChimoneyRes.fromMap(Map<String, dynamic> json) => InitiateChimoneyRes(
    data: Data.fromMap(json["data"]),
  );
}

class Data {
  Data({
    required this.paymentLink,
    required this.data,
    required this.error
  });

  String paymentLink;
  List<Datum> data;
  String error;

  factory Data.fromMap(Map<String, dynamic> json) => Data(
    paymentLink: json["paymentLink"]??'',
    data: List<Datum>.from(json["data"].map((x) => Datum.fromMap(x))),
    error: json["error"]??''
  );
}

class Datum {
  Datum({
    required this.chiRef,
  });

  String chiRef;

  factory Datum.fromMap(Map<String, dynamic> json) => Datum(
    chiRef: json["chiRef"]);
}
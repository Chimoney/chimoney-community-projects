import 'dart:convert';
import 'dart:io';
import 'package:chispend/data/constant/api_constants.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../../navigation/index.dart';

abstract class RequestHelpers {
  Future<http.Response?> post(
      {required String url, required Map<String, dynamic> body});
}

class RequestHelpersImpl extends RequestHelpers {
  final http.Client httpClient;
  final NavigationServiceImpl navigationServiceImpl;

  RequestHelpersImpl(
      {required this.httpClient, required this.navigationServiceImpl});

  @override
  Future<http.Response?> post(
      {required String url, required Map<String, dynamic> body}) async {
    http.Response res;
    String uri = ApiConstants.httpHost + url;
    debugPrint('Url: $uri');
    debugPrint('Payload: ${json.encode(body)}');
    try {
      res = await httpClient
          .post(Uri.parse(uri),
              headers: {
                HttpHeaders.acceptHeader: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
                'X-API-KEY': ApiConstants.apiKey
              },
              body: jsonEncode(body))
          .timeout(const Duration(seconds: 10), onTimeout: () {
        ScaffoldMessenger.of(
                navigationServiceImpl.navigationKey.currentContext!)
            .showSnackBar(
          const SnackBar(content: Text('Connection Timeout')),
        );
        return Future.delayed(const Duration(seconds: 1));
      });
      debugPrint('Response Code: ${res.statusCode}');
      debugPrint('Response Body: ${json.encode(res.body)}');
      return res;
    } catch (e) {
      debugPrint(e.toString());
      ScaffoldMessenger.of(navigationServiceImpl.navigationKey.currentContext!)
          .showSnackBar(const SnackBar(content: Text('Connection Timeout')));
    }
    return null;
  }
}

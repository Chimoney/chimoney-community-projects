import 'dart:convert';
import '../../models/api/initiate_chimoney.dart';
import 'request_helper/index.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../navigation/index.dart';

abstract class PayoutService {
  Future<bool> initiateChimoney({required String channelStr});
  Future<bool> redeemAny({required String chiRef});
}

class PayoutServiceImpl extends PayoutService {
  final RequestHelpersImpl requestHelpersImpl;
  final NavigationServiceImpl navigationServiceImpl;
  PayoutServiceImpl(
      {required this.requestHelpersImpl, required this.navigationServiceImpl});
  @override
  Future<bool> initiateChimoney({required String channelStr}) async {
    try {
      String url = 'payouts/chimoney';
      http.Response? res = await requestHelpersImpl.post(url: url, body: jsonDecode(channelStr));
      if (res?.statusCode == 200) {
        ScaffoldMessenger.of(
                navigationServiceImpl.navigationKey.currentContext!)
            .showSnackBar(
                const SnackBar(content: Text('Transaction successful')));
        InitiateChimoneyRes initiateChimoneyRes =
            initiateChimoneyResFromMap(res!.body);
        bool success = false;
        for (var element in initiateChimoneyRes.data.data) {
          success = await redeemAny(chiRef: element.chiRef);
        }
        return success;
      } else {
        ScaffoldMessenger.of(
                navigationServiceImpl.navigationKey.currentContext!)
            .showSnackBar(SnackBar(
                content: Text(jsonDecode(res!.body)['error'] ??
                    'Failed to make transaction')));
        return false;
      }
    } catch (e) {
      ScaffoldMessenger.of(navigationServiceImpl.navigationKey.currentContext!)
          .showSnackBar(
              const SnackBar(content: Text('Failed to make transaction')));
      debugPrint(e.toString());
      return false;
    }
  }

  @override
  Future<bool> redeemAny({required String chiRef}) async {
    try {
      String url = 'redeem/any';
      http.Response? res =
          await requestHelpersImpl.post(url: url, body: {'chiRef': chiRef, 'redeemData': {}});
      if (res?.statusCode == 200) {
        ScaffoldMessenger.of(
                navigationServiceImpl.navigationKey.currentContext!)
            .showSnackBar(
                const SnackBar(content: Text('Transaction successful')));
        return true;
      } else {
        ScaffoldMessenger.of(
                navigationServiceImpl.navigationKey.currentContext!)
            .showSnackBar(SnackBar(
                content: Text(jsonDecode(res!.body)['error'] ??
                    'Failed to make transaction')));
        return false;
      }
    } catch (e) {
      ScaffoldMessenger.of(navigationServiceImpl.navigationKey.currentContext!)
          .showSnackBar(
              const SnackBar(content: Text('Failed to make transaction')));
      debugPrint(e.toString());
      return false;
    }
  }
}

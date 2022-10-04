import 'package:chispend_widget/chispend_widget.dart';
import 'package:chispend/data/services/api/payout.dart';
import 'package:chispend/di/get_it.dart';
import 'package:flutter/material.dart';

class ChiSpendWebView extends StatelessWidget {
  const ChiSpendWebView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 35),
      child: ChiSpendWidget(
        primaryColor: Colors.green,
        chiSpendTheme: ChiSpendTheme.royal,
        maxAmountInUSD: 1000,
        onMessageReceived: (v) {
          getItInstance<PayoutServiceImpl>().initiateChimoney(channelStr: v);
        },
      ),
    );
  }
}

import 'package:chispend/data/common/helper_functions.dart';
import 'package:chispend/data/services/navigation/index.dart';
import 'package:chispend_widget/chispend_widget.dart';
import 'package:chispend/data/services/api/payout.dart';
import 'package:chispend/di/get_it.dart';
import 'package:flutter/material.dart';

class ChiSpendWebView extends StatelessWidget {
  const ChiSpendWebView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ChiSpendWidget(
      maxAmountInUSD: 1000,
      onMessageReceived: (v) async{
        loader(context);
        await getItInstance<PayoutServiceImpl>().initiateChimoney(channelStr: v);
        getItInstance<NavigationServiceImpl>().pop();
      },
    );
  }
}

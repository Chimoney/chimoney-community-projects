import 'package:Unispend/data/common/helper_functions.dart';
import 'package:Unispend/data/services/navigation/index.dart';
import 'package:Unispend_widget/Unispend_widget.dart';
import 'package:Unispend/data/services/api/payout.dart';
import 'package:Unispend/di/get_it.dart';
import 'package:flutter/material.dart';

class UnispendWebView extends StatelessWidget {
  const UnispendWebView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return UnispendWidget(
      maxAmountInUSD: 1000,
      onMessageReceived: (v) async{
        loader(context);
        await getItInstance<PayoutServiceImpl>().initiateChimoney(channelStr: v);
        getItInstance<NavigationServiceImpl>().pop();
      },
    );
  }
}

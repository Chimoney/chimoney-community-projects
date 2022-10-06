import 'dart:async';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

enum ChiSpendTheme { light, dark, moonlight, royal }

class ChiSpendWidget extends StatefulWidget {
  /// Invoked when a javascript message is returned from the ChiSpendChannel.
  final void Function(String)? onMessageReceived;

  /// Max amount users can spend in USD.
  final double maxAmountInUSD;

  /// Primary colour used. Defaults to Purple.
  final Color primaryColor;

  /// The widget's theme. Defaults to light mode.
  final ChiSpendTheme chiSpendTheme;

  /// DebugPrint events as they occur. Defaults to true.
  final bool logEvent;

  /// Creates a new ChiSpend widget.
  ///
  /// The widget has an [onMessageReceived] callback that listens to the ChiSpendChannel
  ///
  /// The ChiSpendWidget can be customised to user's preference.
  const ChiSpendWidget(
      {Key? key,
      this.onMessageReceived,
      this.chiSpendTheme = ChiSpendTheme.light,
      required this.maxAmountInUSD,
      this.primaryColor = Colors.purple,
      this.logEvent = true})
      : super(key: key);

  @override
  State<ChiSpendWidget> createState() => _ChiSpendWidgetState();
}

class _ChiSpendWidgetState extends State<ChiSpendWidget> {
  final Completer<WebViewController> _controller =
      Completer<WebViewController>();
  final String chispendHost = 'https://chispend.com';

  @override
  void initState() {
    super.initState();
    if (Platform.isAndroid) {
      WebView.platform = SurfaceAndroidWebView();
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          body: WebView(
        initialUrl: chispendHost +
            '/?cSContext=mobile' +
            '&primaryColor=${widget.primaryColor.value.toRadixString(16).substring(2)}' +
            '&xAppStyle=${widget.chiSpendTheme.name}' +
            '&maxAmountInUSD=${widget.maxAmountInUSD}',
        javascriptMode: JavascriptMode.unrestricted,
        onWebViewCreated: (WebViewController webViewController) {
          _controller.complete(webViewController);
        },
        onProgress: (int progress) {
          debugPrint('ChiSpend is loading (progress : $progress%)');
        },
        javascriptChannels: {
          JavascriptChannel(
            name: 'ChiSpendChannel',
            onMessageReceived: (message) async {
              if (widget.logEvent) {
                debugPrint('Javascript: ${message.message}');
              }
              if (widget.onMessageReceived != null) {
                widget.onMessageReceived!(message.message);
              }
            },
          ),
        },
        onPageStarted: (String url) {
          if (widget.logEvent) {
            debugPrint('Page started loading: $url');
          }
        },
        onPageFinished: (String url) {
          if (widget.logEvent) {
            debugPrint('Page finished loading: $url');
          }
        },
        gestureNavigationEnabled: true,
        backgroundColor: const Color(0x00000000),
      )),
    );
  }
}

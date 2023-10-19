import 'package:Unispend/di/get_it.dart';
import 'package:Unispend/presentation/ui/webview/index.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'data/services/navigation/index.dart';

void main() async{
  await initDependencies();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.light
        .copyWith(
        statusBarIconBrightness: Brightness.dark,
        statusBarColor: Colors.white));
    return MaterialApp(
      title: 'Unispend',
      theme: ThemeData(
        scaffoldBackgroundColor: Colors.white,
        primarySwatch: Colors.purple
      ),
      navigatorKey: getItInstance<NavigationServiceImpl>().navigationKey,
      debugShowCheckedModeBanner: false,
      home: const UnispendWebView(),
    );
  }
}

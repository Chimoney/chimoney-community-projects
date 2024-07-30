import 'package:flutter/material.dart';

abstract class NavigationService {
  Future<dynamic> navigateTo(String routeName, {dynamic arguments});

  Future<dynamic> replaceWith(String routeName, {dynamic arguments});

  void pop({dynamic v});

  Future<dynamic> replaceUntil(
      {required String routeName,
        required String lastRouteName,
        dynamic arguments});
}

class NavigationServiceImpl extends NavigationService {
  final GlobalKey<NavigatorState> _navigationKey = GlobalKey<NavigatorState>();

  GlobalKey<NavigatorState> get navigationKey => _navigationKey;

  @override
  void pop({dynamic v = false}) {
    return _navigationKey.currentState!.pop(v);
  }

  @override
  Future<dynamic> navigateTo(String routeName, {dynamic arguments}) {
    return _navigationKey.currentState!
        .pushNamed(routeName, arguments: arguments);
  }

  @override
  Future<dynamic> replaceWith(String routeName, {dynamic arguments}) {
    return _navigationKey.currentState!
        .pushReplacementNamed(routeName, arguments: arguments);
  }

  @override
  Future<dynamic> replaceUntil(
      {required String routeName,
        required String lastRouteName,
        dynamic arguments}) {
    return _navigationKey.currentState!.pushNamedAndRemoveUntil(
        lastRouteName, ModalRoute.withName(routeName),
        arguments: arguments);
  }
}

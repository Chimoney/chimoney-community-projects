import 'package:chispend/data/services/api/payout.dart';
import 'package:chispend/data/services/api/request_helper/index.dart';
import 'package:get_it/get_it.dart';
import 'package:http/http.dart' as http;

import '../data/services/navigation/index.dart';

final getItInstance = GetIt.I;

Future initDependencies() async {
  final http.Client _client = http.Client();
  getItInstance.registerLazySingleton<http.Client>(() => _client);

  // NAVIGATION
  getItInstance.registerLazySingleton<NavigationServiceImpl>(
      () => NavigationServiceImpl());

  // REQUEST HELPER
  getItInstance.registerLazySingleton<RequestHelpersImpl>(() =>
      RequestHelpersImpl(
          httpClient: getItInstance(), navigationServiceImpl: getItInstance()));

  getItInstance.registerLazySingleton<PayoutServiceImpl>(
      () => PayoutServiceImpl(requestHelpersImpl: getItInstance(), navigationServiceImpl: getItInstance()));
}

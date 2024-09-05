import 'package:flutter/material.dart';

void loader(BuildContext context) {
  showDialog(
      context: context,
      barrierDismissible: false,
      useSafeArea: false,
      barrierColor: Colors.black38,
      builder: (context) {
        return Dialog(
            backgroundColor: Colors.transparent,
            elevation: 0,
            shape: const RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(8))),
            child: Container(
                alignment: Alignment.center,
                    color: Colors.transparent,
                child: const SizedBox(
                    height: 60,
                    width: 60,
                    child: CircularProgressIndicator(strokeWidth: 6, color: Colors.purple))));
      });
}

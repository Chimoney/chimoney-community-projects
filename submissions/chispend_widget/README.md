A flutter package the provides a widget for [ChiSpend](https://chispend.com/) marketplace.

## Requirement

- Android Support:	SDK 19+ or 20+
- IOS Support:	9.0+

## Feature

- Access to ChiSpend marketplace using [webview](https://pub.dev/packages/webview_flutter).
- Full ability to customise widget theme and colour.


## Usage
```dart
class ChiSpendExample extends StatelessWidget {
  const ChiSpendExample({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ChiSpendWidget(
      primaryColor: Colors.green,
      chiSpendTheme: ChiSpendTheme.royal,
      maxAmountInUSD: 1000,
      onMessageReceived: (v) {
        print(v);
      },
    );
  }
}
```
![Screenshot_20221004-170738](https://user-images.githubusercontent.com/91986740/193871410-36db82b5-cf3e-4baa-9439-c0464569183e.jpg)
![Screenshot_20221004-171219](https://user-images.githubusercontent.com/91986740/193871229-74234009-924f-4bf7-bbc9-2d67788a0b6d.jpg)
![Screenshot_20221004-170946](https://user-images.githubusercontent.com/91986740/193871437-57a4efd2-1478-4c52-96e4-500de3e18e0a.jpg)


## Additional information

Please refer to [webview package](https://pub.dev/packages/webview_flutter) if any issue is encountered.

from . import Chimoney, main, test_chimoney_auth_key, TestCase


class TestChimoney(TestCase):
    def setUp(self) -> None:
        return super(TestChimoney, self).setUp()
        self.chimoney = Chimoney()

    def test_auth_key(self):
        self.assertNotEqual(
            test_chimoney_auth_key, "Missing Authorization key argument or env variable"
        )

    def test_ping(self):
        self.assertEqual(self.chimoney.ping(), ("pong", 200))

    def test_info(self):
        self.assertEqual(self.chimoney.info.countries(), ("pong", 200))

    def test_account(self):
        self.assertEqual(self.chimoney.account.balance(), ("pong", 200))

    def test_payouts(self):
        self.assertEqual(self.chimoney.payouts.list(), ("pong", 200))

    def test_subaccount(self):
        self.assertEqual(self.chimoney.subaccount.list(), ("pong", 200))

    def test_wallet(self):
        self.assertEqual(self.chimoney.wallet.list(), ("pong", 200))

    def test_redeem(self):
        self.assertEqual(self.chimoney.redeem.list(), ("pong", 200))


if __name__ == "__main__":
    main()

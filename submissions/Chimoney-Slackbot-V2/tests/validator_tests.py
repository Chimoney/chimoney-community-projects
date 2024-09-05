# test validators and functions

from pytest import mark
from modules import validators


# test validators
@mark.parametrize(
    "test_input,expected",
    [
        ("$100 <@U01CZ1H2R7U>", (True, "SASMU")),
        ("$100 <@U01CZ1H2R7U> <@U01CZ1H2R7U>", (True, "SASMU")),
        ("$100 <@U01CZ1H2R7U> <@U01CZ1H2R7U> <@U01CZ1H2R7U>", (True, "SASMU")),
        ("100 <@U01CZ1H2R7U>", (True, "SASMU")),
        ("100 <@U01CZ1H2R7U> <@U01CZ1H2R7U>", (True, "SASMU")),
        ("100 <@U01CZ1H2R7U> <@U01CZ1H2R7U> <@U01CZ1H2R7U>", (True, "SASMU")),
        ("#100 <@U01CZ1H2R7U>", (True, "SASMU")),
        ("#100 <@U01CZ1H2R7U> <@U01CZ1H2R7U>", (True, "SASMU")),
        ("#100 <@U01CZ1H2R7U> <@U01CZ1H2R7U> <@U01CZ1H2R7U>", (True, "SASMU")),
        (
            "100 <@U01CZ1H2R7U> 100 <@U01CZ1H2R7U> 100 <@U01CZ1H2R7U>",
            (False, "Invalid format"),
        ),
        (
            "$100 $100 $100 <@U01CZ1H2R7U> <@U01CZ1H2R7U> <@U01CZ1H2R7U>",
            (False, "Invalid format"),
        ),
    ],
)
def test_validate_sendchimoney_text(test_input, expected):
    assert validators.validate_sendchimoney_text(test_input) == expected

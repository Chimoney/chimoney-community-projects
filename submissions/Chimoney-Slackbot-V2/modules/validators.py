import re
from .choices import ValidatorRegexFormats


def validate_sendchimoney_text(text):
    # Check if the text is empty
    if not text:
        return False

    # Check if the text is a valid format
    regex_formats = ValidatorRegexFormats()
    regex = regex_formats.get_regex("same_ammount_single_or_multiple_users")
    if re.match(regex, text):
        return True, "SASMU"

    return False, "Invalid format"


def validate_giveaway_text(text):
    # Check if the text is empty
    if not text:
        return False

    # Check if the text is a valid format
    regex_formats = ValidatorRegexFormats()
    regex = regex_formats.get_regex("random_giveaway")
    if re.match(regex, text):
        return True, "RG"

    regex = regex_formats.get_regex("random_giveaway_between_multiple_users")
    if re.match(regex, text):
        return True, "RGBMU"

    return False, "Invalid format"


if __name__ == "__main__":
    print(validate_sendchimoney_text("$100 @U01CZ1H2R7U"))
    print(validate_sendchimoney_text("$100 @U01CZ1H2R7U @U01CZ1H2R7U"))
    print(validate_sendchimoney_text("$100 @U01CZ1H2R7U @U01CZ1H2R7U @U01CZ1H2R7U"))
    print(
        validate_sendchimoney_text(
            "$100 $100 $100 @U01CZ1H2R7U @U01CZ1H2R7U @U01CZ1H2R7U"
        )
    )
    print(
        validate_sendchimoney_text(
            "$100 $100 $100 @U01CZ1H2R7U @U01CZ1H2R7U> @U01CZ1H2R7U> @U01CZ1H2R7U"
        )
    )
    print(
        validate_sendchimoney_text(
            "$100 $100 $100 $100 $100 $100 $100 @U01CZ1H2R7U @U01CZ1H2R7U @U01CZ1H2R7U @U01CZ1H2R7U"
        )
    )
    print(
        validate_sendchimoney_text("100 @U01CZ1H2R7U 100 @U01CZ1H2R7U 100 @U01CZ1H2R7U")
    )

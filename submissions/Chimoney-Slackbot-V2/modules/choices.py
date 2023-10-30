class ValidatorRegexFormats:
    def __init__(self):
        self._regex_formats = {
            "same_ammount_single_or_multiple_users": r"^[$#]?\d+\s(@\w+\s*)+$",
        }

    def get_regex(self, regex_format):
        return self._regex_formats[regex_format]

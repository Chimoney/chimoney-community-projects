class PyChimoneyError(Exception):
    """Base class for PyChimoney errors."""

    pass


class MissingAuthKeyError(PyChimoneyError):
    """Raised when the user has not authenticated."""

    pass


class InvalidMethodError(PyChimoneyError):
    """Raised when the method is not valid."""

    pass


class Error(PyChimoneyError):
    """Random exception taker"""

    pass

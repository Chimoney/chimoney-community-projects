from multiprocessing.util import is_abstract_socket_namespace
from setuptools import setup, find_packages

with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name="pychimoney",
    version="0.0.1",
    author="Asikhalaye Samuel",
    author_email="samuelasikhalaye@gmail.com",
    description="A Python package for Chimoney",
    long_description=long_description,
    long_description_content_type="text/markdown",
    # url="https://github.com/thelimeskies/Chimoney-Python",
    packages=find_packages(),
    keywords=["Chimoney", "Python", "Chimoney-Python"],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.6",
)

from setuptools import setup, find_packages

with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name="chimoney-py",
    version="0.0.2",
    author="Asikhalaye Samuel",
    author_email="samuelasikhalaye@gmail.com",
    description="A Python package for Chimoney",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/Chimoney/chimoney-community-projects/tree/main/submissions/Chimoney-Python",
    # download_url="",  # TODO add download url
    license="MIT",
    packages=["chimoney"],
    keywords=[
        "Chimoney",
        "Python",
        "Chimoney-Python",
        "Chimoney Python",
        "Chimoney Python Wrapper",
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "Topic :: Software Development :: Libraries",
        "Topic :: Software Development",
        "Topic :: Utilities",
        "Topic :: Internet",
    ],
    install_requires=["requests"],
    python_requires=">=3.6",
)

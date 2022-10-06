FROM python:3.10-alpine

WORKDIR /bots
COPY config.py /bots/
COPY chisend.py /bots/
COPY requirements.txt /tmp/
COPY entrypoint.sh /

RUN pip install -r /tmp/requirements.txt

ENTRYPOINT [ "sh" , "/entrypoint.sh" ]
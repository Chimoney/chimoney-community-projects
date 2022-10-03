FROM python:3.10-alpine

COPY config.py /bots/
COPY chisend.py /bots/
COPY requirements.txt /tmp/

RUN pip install -r /tmp/requirements.txt

WORKDIR /bots

CMD ["python", "chisend.py"]
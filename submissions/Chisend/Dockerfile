FROM python:3.9-alpine

COPY bots/chisend.py /bots/
COPY bots/main.py /bots/
COPY bots/utils.py /bots/
COPY requirements.txt /tmp
RUN pip install -r /tmp/requirements.txt

WORKDIR /bots

CMD ["python", "main.py", "-ue"]
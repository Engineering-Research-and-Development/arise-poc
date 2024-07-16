FROM python:3.8.17-alpine3.18 as base
FROM base as builder
RUN apk --no-cache --update-cache add gcc python3 python3-dev py-pip build-base wget rust cargo
RUN ln -s /usr/include/locale.h /usr/include/xlocale.h
RUN pip install --upgrade pip
RUN pip install pipenv
RUN mkdir -p /src/ngsi-timeseries-api
COPY Pipfile /src/ngsi-timeseries-api/Pipfile
COPY Pipfile.lock /src/ngsi-timeseries-api/Pipfile.lock
RUN cd /src/ngsi-timeseries-api && { pipenv requirements > /requirements.txt; }
RUN pip install -r /requirements.txt
RUN pip install supervisor

FROM base
RUN apk --no-cache add curl
COPY --from=builder /usr/local /usr/local
COPY . /src/ngsi-timeseries-api/

COPY /custom-init.sh /src/ngsi-timeseries-api/src/custom-init.sh
COPY /inject.sh /src/ngsi-timeseries-api/src/inject.sh

RUN chown root /src/ngsi-timeseries-api/src/custom-init.sh  && \
    chgrp root /src/ngsi-timeseries-api/src/custom-init.sh

RUN chown root /src/ngsi-timeseries-api/src/inject.sh  && \
    chgrp root /src/ngsi-timeseries-api/src/inject.sh

RUN chmod 775 /src/ngsi-timeseries-api/src/custom-init.sh
RUN chmod 775 /src/ngsi-timeseries-api/src/inject.sh

RUN apk add jq nano

WORKDIR /src/ngsi-timeseries-api/src
ENV PYTHONPATH=$PWD:$PYTHONPATH

EXPOSE 8668
#ENTRYPOINT ["python", "app.py"]
ENTRYPOINT ["sh", "custom-init.sh"]

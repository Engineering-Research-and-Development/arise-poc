FROM fiware/quantum-leap:1.0.0

USER root 

RUN apk add jq nano

COPY /custom-init.sh /src/ngsi-timeseries-api/src/custom-init.sh
COPY /inject.sh /src/ngsi-timeseries-api/src/inject.sh

RUN chown root /src/ngsi-timeseries-api/src/custom-init.sh  && \
    chgrp root /src/ngsi-timeseries-api/src/custom-init.sh

RUN chown root /src/ngsi-timeseries-api/src/inject.sh  && \
    chgrp root /src/ngsi-timeseries-api/src/inject.sh

RUN chmod 775 /src/ngsi-timeseries-api/src/custom-init.sh
RUN chmod 775 /src/ngsi-timeseries-api/src/inject.sh

RUN chmod 775 /src/ngsi-timeseries-api/src/app.py

WORKDIR /src/ngsi-timeseries-api/src

EXPOSE 8668
ENTRYPOINT ["sh", "custom-init.sh"]

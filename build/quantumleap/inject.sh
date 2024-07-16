#!/bin/sh

echo "
========================================================

Starting inject.sh

========================================================
"

echo "
========================================================

Checking if automatic subscription is enabled..

========================================================
"

 if [ $AUTOMATIC_SUBSCRIPTION != "true" ] ; then
    echo 'Automatic subscription is disabled'
    exit 0
fi

echo "
========================================================

Waiting for CrateDB to start..

========================================================
"

crate_response=$(curl -s crate-db:4200)
crate_status=$(echo "$crate_response" | jq '.status')

LOOPS=15
while [ "$crate_status" -ne 200 ]; do

    echo "
    ========================================================

    Waiting for CrateDB to start..

    ========================================================
    "

    sleep 15
    let LOOPS--
    if [ $LOOPS -eq 0 ] ; then
        echo 'CrateDB has not started :( :('
        exit 1
    fi

    crate_response=$(curl -s crate-db:4200)
    crate_status=$(echo "$crate_response" | jq '.status')

done

echo "
========================================================

CrateDB Started!

========================================================
"

echo "
========================================================

Waiting for Orion-LD to start..

========================================================
"

orion_status=$(curl -s -o /dev/null -w "%{http_code}" orion:1026/version)

LOOPS=15
while [ "$orion_status" -ne 200 ]; do

    echo "
    ========================================================

    Waiting for Orion-LD to start..

    ========================================================
    "

    sleep 15
    let LOOPS--
    if [ $LOOPS -eq 0 ] ; then
        echo 'Orion-LD has not started :( :('
        exit 1
    fi

        orion_status=$(curl -s -o /dev/null -w "%{http_code}" orion:1026/version)

done

echo "
========================================================

Orion-LD Started!

========================================================
"

echo "
========================================================

Sending the subscription request..

========================================================
"

subscription_file="/src/ngsi-timeseries-api/src/subscription-ld.json"

if [ -e "$subscription_file" ]; then
    tenant=$(jq -r '.notification.endpoint.receiverInfo[] | select(.key == "fiware-service") | .value' "$subscription_file")
   
    subscription_status=$(curl -s -L -o /dev/null -w "%{http_code}" -X POST 'http://orion:1026/ngsi-ld/v1/subscriptions/' \
    -H 'Content-Type: application/ld+json' \
    -H "NGSILD-Tenant: $tenant" \
    -d @"$subscription_file")

    if [ "$subscription_status" -ne 201 ] ; then
        echo 'Subscription could not be sent :( :('
        exit 1
    else
        echo "
        ========================================================

        Subscription sent successfully!

        ========================================================
        "
    fi
else
    echo 'The subscription file has not been found :( :('
    exit 1
fi


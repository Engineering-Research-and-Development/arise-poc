#!/bin/sh

echo "
========================================================

Starting inject.sh

========================================================
"

sleep 20

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

Running IoTAgent OPCUA..

========================================================
"

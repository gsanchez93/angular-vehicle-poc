#!/bin/bash
HOST='http://ec2-34-209-179-208.us-west-2.compute.amazonaws.com/pub?id=auction'

NAME[0]="Adam"
NAME[1]="Betty"
NAME[2]="Carla"
NAME[3]="Derrick"
NAME[4]="Emily"

for i in `seq 1 30`; do
    VEHICLE=$[ ( $RANDOM % 6 )  + 20000 ]
    BID=$[ ( $RANDOM %  500)  + 5000 ]
    BIDDER=${NAME[$RANDOM % 5]};
    MESSAGE='{\"vehicleMovementId\":\"'$VEHICLE'\",\"bidder\":\"'$BIDDER'\",\"amount\":\"'$BID'\"}';

    echo $MESSAGE;
    curl -s -X POST $HOST -d $MESSAGE
done
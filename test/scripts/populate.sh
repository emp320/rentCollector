#!/bin/bash

mongoimport --jsonArray --drop --db $DB --collection renters --file ../data/renters.json
mongoimport --jsonArray --drop --db $DB --collection apartments --file ../data/apartments.json

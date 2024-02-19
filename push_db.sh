#!/bin/bash
mysql -u root << EOF
drop database space4art;
create database space4art;
EOF

mysql -u root space4art < ./database.sql

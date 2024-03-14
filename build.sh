#!/bin/bash

npm run build
cp package-lock.json ../scientifico_production
cp package.json ../scientifico_production
cp build ../scientifico_production/build -r
cp database.sql ../scientifico_production

cd ../scientifico_production
git add .
git commit -a
git push origin production
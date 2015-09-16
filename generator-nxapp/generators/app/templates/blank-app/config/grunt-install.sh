#! /bin/bash

while read line
do
   npm install $line
done < grunt.conf


#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

## Acquire Font Awesome
FONT_AWESOME_VERSION=4.7.0
TEMP_ZIP=$(mktemp)
TEMP_FOLDER=$(mktemp -d)
# Download it
wget -O $TEMP_ZIP https://fontawesome.com/v${FONT_AWESOME_VERSION}/assets/font-awesome-${FONT_AWESOME_VERSION}.zip
# Unpack it
cd $TEMP_FOLDER
unzip $TEMP_ZIP
rm $TEMP_ZIP
cd $DIR
# Copy it
cp -r $TEMP_FOLDER/font-awesome-${FONT_AWESOME_VERSION} font-awesome
rm -rf $TEMP_FOLDER

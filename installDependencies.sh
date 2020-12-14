#!/bin/sh
#Install dependencies for patient-app
tns plugin add nativescript-audio
tns plugin add @nativescript/local-notifications
tns plugin add nativescript-qr-generator
npm install lokijs --save
npm install loki-nativescript-adapter --save
npm install rxjs --save
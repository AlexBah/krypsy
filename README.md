# Krypsy dev command

# Install libraries

npm install google-protobuf

# Building new \*.apk

eas build --platform android --local
eas build -p android --profile preview

# Run project with Android Studio Emulator

npx expo run:android

# Cleaning some module

npm uninstall react-native-fetch-blob
npm cache clean --force
cd android
./gradlew clean

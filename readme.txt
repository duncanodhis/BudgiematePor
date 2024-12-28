
### 1. Install Node.js and npm
   - Download Node.js: 
      - Check installation: After installation, verify by running the following commands in your terminal:
     ```bash
     node -v
     npm -v
     ```

### 2. Install Expo CLI
   - Install Expo CLI globally: Expo CLI helps manage your React Native projects. Install it globally with npm:
     
     npm install -g expo-cli
     

####
inside budgiemate folder type npm install 
###
### 3. Install Xcode
   Xcode is required to run the iOS simulator and build your app for iOS.
   - Install Xcode from the Mac App Store: [Download Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) from the Mac App Store.
   - Run Xcode: After installation, open it at least once to complete the setup.
   - Install Xcode Command Line Tools:
     You can install them by running the following in your terminal:
    
     xcode-select --install
    

### 4. Install Expo Go App (For Testing on Real Devices)
   - Expo Go allows you to test your app directly on your iPhone or iPad.
   - Download Expo Go from the [App Store](https://apps.apple.com/us/app/expo-go/id982107779).

   After installing the Expo Go app, you can run your app on a physical iOS device by scanning the QR code that appears in your terminal when you start your project.

### 5. Run Your Expo App on iOS
   - Start the project: In your terminal, navigate to your project folder and run:
    
     cd budgiemate
     expo start
     

   - Open in iOS Simulator: Expo will display a QR code and a URL in your terminal. If you have the iOS Simulator set up with Xcode, you can choose to open your project in the simulator by pressing `i` when prompted in your terminal.
     - Alternatively, you can click the "Run on iOS simulator" button in the Expo DevTools (the web interface that opens when you run `expo start`).

   - Scan the QR Code with Expo Go: If you're using a physical iOS device, open the Expo Go app and scan the QR code that appears in your terminal or DevTools.

### 6. Optional: Debugging and Development Tools
   - Enable Debugging: While running your app, you can open the developer menu in the iOS simulator by pressing `Cmd+D`, or on a physical device by shaking the device. This allows you to enable remote debugging, reload the app, or check the logs.
   - Use React Native Debugger: If you need more advanced debugging features, you can integrate React Native Debugger or use Chrome’s developer tools by enabling remote debugging.

---

### Additional Tips:
- Run your app on an actual device: Testing on a real device gives you a better idea of performance and behavior. After installing the Expo Go app on your iPhone or iPad, simply scan the QR code displayed in the terminal after running `expo start`.
- you’ll need an Apple Developer account.


To build and deploy your React Native app created with Expo using Transporter (Apple's app upload tool for macOS), you need to follow a few steps. Transporter is used to upload your app to the App Store Connect for distribution on the App Store. Here's a step-by-step guide to building and deploying your app using Transporter:

### Step 1: Prepare Your Expo App for Building

Before you can upload your app to the App Store, you need to create a production-ready build of your app.


### Step 2: Build the iOS App Using Expo

You can build the iOS app using Expo's build service. Expo allows you to generate an `.ipa` (iOS application) file that you can upload to the App Store.

#### 2.1. Log in to Expo CLI
First, log in to your Expo account using the command:
expo login


#### 2.2. Build the App for iOS
To build your app for iOS, run the following command:

expo build:ios


This command will prompt you to either:
- Use an existing Apple Developer account or
- Create a new one if you haven’t set it up already.

You’ll also need to provide your Apple credentials (Apple Developer Program account) for Expo to create the necessary certificates and provisioning profiles.

Once the build process completes, Expo will provide you with a link to download the `.ipa` file.

### Step 3: Download the `.ipa` File

After the build process completes, you can download the `.ipa` file from the link provided by Expo. This `.ipa` file is the actual iOS app package that you will upload to the App Store.

### Step 4: Set Up Transporter

Transporter is Apple's app upload tool for macOS, available through the Mac App Store. Here’s how you set it up:

#### 4.1. Install Transporter
- Download and install Transporter from the Mac App Store: [Download Transporter](https://apps.apple.com/us/app/transporter/id1450874784?mt=12).

#### 4.2. Sign In to Transporter
- Open Transporter and sign in with your Apple Developer account credentials.

### Step 5: Upload the `.ipa` File Using Transporter

#### 5.1. Open Transporter and Upload Your `.ipa` File
1. Launch Transporter.
2. Click on the "Add App" button and select your `.ipa` file that you downloaded from Expo.
3. Transporter will check the app's metadata, verify the package, and ensure everything is in order.

#### 5.2. Upload to App Store Connect
- Once Transporter verifies the app package, click the "Deliver" button. Transporter will upload your `.ipa` file to App Store Connect for submission to the App Store.

#### 5.3. Monitor the Upload
- The upload process will begin, and Transporter will display progress. When the upload completes, you’ll see a confirmation message.

### Step 6: Submit Your App to the App Store

After the app is uploaded, you will need to submit it through App Store Connect:
1. Go to [App Store Connect](https://appstoreconnect.apple.com) and sign in with your Apple Developer account.
2. Go to "My Apps" and select your app.
3. Under the "App Store" section, you’ll see the newly uploaded version of your app.
4. Review the metadata, screenshots, and app information, and make any necessary updates.
5. Submit the app for review. Apple will review your app, and once approved, it will be available on the App Store.

---

### Additional Notes:

- App Store Connect Setup: Make sure your app is properly configured in App Store Connect before submission (e.g., setting the app’s version, adding screenshots, descriptions, pricing, etc.).
  
- App Review: Once submitted, Apple’s review process can take anywhere from a few days to a week, depending on the complexity and the app's compliance with Apple’s guidelines.

- Updating the App: If you need to update the app, increment the build number and version in `app.json` and repeat the process.

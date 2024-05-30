# HOP Commute App

HOP Commute is a mobile application that helps users manage and optimize their daily commutes. This guide will help you set up the development environment and run the application on an Android emulator.

## Prerequisites
#### Note : Refer to the backend repository README.md for detailed backend setup instructions. Then proceed with the following steps.
Before you begin, ensure you have the following installed:

- [Android Studio](https://developer.android.com/studio)
- [Node.js](https://nodejs.org/) (which includes npm)
- [Yarn](https://yarnpkg.com/getting-started/install)

## Setup

Follow these steps to set up and run the HOP Commute app:

### 1. Open the Project in Android Studio
- Launch Android Studio.
- Click on **File > Open** and navigate to the directory where you cloned the repository. Select the project directory and click OK.

### 2. Configure the Android Emulator
In Android Studio, click on the `Device Manager` button on the right sidebar or go to `View > Tool Windows > Device Manager`.
Click on `Create Device`.
Select `Pixel 8` as the device and click `Next`.
Choose a system image (preferably API level 31) and click `Next`.
Verify the configuration and click `Finish` to create the emulator.

### 3. Start the Emulator
In the `Device Manager`, you should now see the `Pixel 8` emulator listed. Click on the `Play` button next to it to start the emulator.

### 4. Install Dependencies
You can install Yarn using npm, which comes with Node.js. To install Yarn, follow the instructions below based on your operating system.

1. Open your terminal or command prompt.
2. Run the following command to install Yarn globally:
```shell
npm install --global yarn
```
3. Verify the installation by checking the Yarn version:
```shell
yarn --version
```
You should see the installed version of Yarn printed to the console.

### 5. Install Project Dependencies
Once Yarn is installed, open a terminal (you can use the one integrated in Android Studio or a separate terminal window) and navigate to the root directory of the cloned repository. Run the following command to install the required dependencies:

```shell
yarn install
```
If you encounter any permission issues, you may need to prefix the command with sudo (for macOS or Linux):
```shell
sudo yarn install
```
### 6. Start the Application
With the dependencies installed, you can now start the application as android Run the following command in the terminal:
```shell
yarn start
```
Then click `a` when metro is up

This command will compile the application and launch it in the Android emulator you started earlier.

For further assistance, please contact `haripriya_sridharan@comcast.com` , `gowtham_rajendran@comcast.com` , `mouli_vijay@comcast.com` , `deeranchinnamalai_asokan@comcast.com` , `keerthana_d@comcast.com`.
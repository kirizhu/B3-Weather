README for B3 Expo Code Test Project

B3 Expo Code Test Project

This project was developed as a code test for B3, using the Expo framework for building cross-platform React Native applications. It adheres to the provided requirements, focusing on delivering a clean, functional, and scalable implementation.

🚀 Features
• Responsive UI: Designed to work seamlessly across both iOS and Android.
• List Display: Cities (e.g., Stockholm, New York, etc.) are fetched and displayed based on static data.
• Detail Forecast: Displays current weather, daily forecasts, and hourly data for the selected city.

🛠️ Tech Stack
• Expo: Framework for developing cross-platform React Native apps.
• TypeScript: Ensures type safety and better development experience.

📁 Project Structure

src/
├── components/ # Reusable UI components
├── screens/ # Main screens for the app
├── api/ # API service logic
├── types/ # TypeScript type definitions

🖥️ Setup and Running the Project

Prerequisites 1. Node.js: Ensure you have Node.js installed. 2. Expo CLI: Install globally via npm install -g expo-cli.

    1.	Install dependencies:

npm install

    2.	Start the Expo server:

npx expo start

    4.	Use the QR code to test on a physical device via the Expo Go app or run it on an emulator.

🚧 Potential Improvements

1. Search Functionality
   • Why? Allows users to search for a city rather than being restricted to predefined options.
   • Implementation:
   • Add an input field to the UI to capture the user query.
   • Query OpenWeather’s geocoding endpoint to fetch matching city suggestions.

2. Unit and Integration Testing
   • Why? Ensure reliability and robustness of the app.
   • Implementation:
   • Mock API calls.
   • Use Jest and React Native Testing Library for unit and integration tests.

3. Offline Support
   • Why? Improve user experience in areas with poor connectivity.
   • Implementation:
   • Cache API responses using libraries like AsyncStorage or MMKV.

4. Accessibility
   • Why? Improve usability for diverse user bases.
   • Implementation:
   • Leverage accessibility tools in React Native to ensure WCAG compliance.

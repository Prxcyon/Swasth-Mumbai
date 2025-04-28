# Swasth Mumbai

Swasth Mumbai is a comprehensive health and safety app for Mumbai residents and visitors. It provides real-time health alerts, a dashboard for weather and air quality, a map of hospitals and pharmacies, emergency contacts, and a health toolkit with first aid and prevention tips. The app is built with React Native and Expo, and supports multiple languages for accessibility.

## Features

- **Dashboard:**
  - Real-time weather and air quality updates for your location.
  - Health alerts for outbreaks, high AQI, and more.

- **Health Map:**
  - Interactive map showing major hospitals and pharmacies in Mumbai (static and live from Google Places).
  - Outbreak locations and health-related incidents.
  - Custom markers for hospitals (red H) and pharmacies (green pill).

- **Emergency Contacts:**
  - One-tap calling for all major Mumbai and national emergency numbers (police, fire, ambulance, disaster, women/child helplines, etc.).
  - Regularly updated from official sources.

- **Health Toolkit:**
  - First aid instructions with images for common emergencies.
  - Prevention tips for monsoon, pollution, and general health.
  - Symptoms guide and official health resources.

- **Localization:**
  - Supports English, Hindi, and Marathi.
  - Language selector in the app header.

- **Accessibility:**
  - High-contrast UI, large touch targets, and readable fonts.

## Dependencies

The following major dependencies are required to run this app:

- [expo](https://docs.expo.dev/) (SDK 49+ recommended)
- [react-native](https://reactnative.dev/)
- [react-native-maps](https://github.com/react-native-maps/react-native-maps)
- [expo-font](https://docs.expo.dev/versions/latest/sdk/font/)
- [expo-router](https://expo.github.io/router/docs)
- [lucide-react-native](https://lucide.dev/icons/)
- [@expo-google-fonts/poppins](https://github.com/expo/google-fonts/tree/master/font-packages/poppins)
- [i18next](https://www.i18next.com/) and [react-i18next](https://react.i18next.com/) (for localization)
- [expo-location](https://docs.expo.dev/versions/latest/sdk/location/)
- [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [react-native-modal](https://github.com/react-native-modal/react-native-modal)

**Install all dependencies:**
```bash
npm install
# or
yarn install
```

If you need to install a specific package manually, for example:
```bash
npm install react-native-maps expo-font expo-router lucide-react-native @expo-google-fonts/poppins i18next react-i18next expo-location expo-notifications react-native-modal
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd <project-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   - Create a `.env` file or update the config for your Google Maps API key:
     ```env
     GOOGLE_PLACES_API_KEY=your_google_maps_api_key
     ```
   - The API key must have Places API enabled.

4. **Run the app:**
   ```bash
   npx expo start
   # or
   yarn start
   ```
   - Use the Expo Go app or an emulator to preview the app.

## Project Structure

- `app/` — Main app screens and navigation
- `components/` — UI components, map, health toolkit, alerts, etc.
- `assets/` — Images and icons
- `i18n/` — Localization files

## Credits

- Built with [React Native](https://reactnative.dev/) and [Expo](https://expo.dev/)
- Map and places data from [Google Maps Platform](https://cloud.google.com/maps-platform/)
- Health resources from official government and WHO sources

## License

This project is for educational and non-commercial use. For questions or contributions, please open an issue or pull request. 
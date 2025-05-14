# MoodTracker: Universal Mood Tracking with Customizable Visual Representations
## Project Overview
This project is a customizable mood tracking application built using [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/). It is designed to provide an inclusive and visually engaging way to track moods (inspired by the valence-arousal model). The app has a unique interface where users can select personalized theme colours for different mood states and select their preferred interactive component for logging - graphs and sliders. These choices are then reflected in the UI, providing each user with their own custom mood-tracking experience.

## Author
Tamara Orosz (22354646)

## Features

- **Customizable Mood Colors**: Personalize the app's appearance by selecting colors for different mood states (e.g., pleasant, unpleasant, high energy, low energy).
- **Interactive Graphs**: Drag or tap on a graph to log your mood visually.
- **Precision Sliders**: Adjust mood values with sliders for more granular control.
- **Dual Interaction Modes**: Use the graph, sliders, or both to track your mood.
- **Persistent Preferences**: Saves and retrieves user preferences (colors, tracker type, and mood values) using AsyncStorage for returning users.

## Screenshots
Start Screen | Customizing colours | Picking a colour
:-------------------------:|:-------------------------:|:-------------------------:
![](/assets/screenshots/1.jpg) | ![](/assets/screenshots/2.jpg) | ![](/assets/screenshots/3.jpg)
Default colours chosen | Picking tracker component 1 | Picking tracker component 2
![](/assets/screenshots/4.jpg) | ![](/assets/screenshots/5.jpg) | ![](/assets/screenshots/6.jpg)
Tracker component selected | Graph + Sliders | Graph + Sliders
![](/assets/screenshots/7.jpg) | ![](/assets/screenshots/8.jpg) | ![](/assets/screenshots/9.jpg)
Logged mood values | Sliders | Graph
![](/assets/screenshots/10.jpg) | ![](/assets/screenshots/11.jpg) | ![](/assets/screenshots/12.jpg)
Menu | |
![](/assets/screenshots/13.jpg)

## App Flow
1. **First Launch** 
   - User picks theme colours for pleasant, unpleasant, high energy, low energy
   - User picks preferred interactive mood model: graph and sliders, graph only or sliders only

2. **Subsequent Launches**
   - User logs their mood using their custom interface

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ButterflyLion/MoodTracker.git
   cd MoodTracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the app:
   ```bash
   npx expo start
   ```

4. Open the app using:
   - [development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Expo Go](https://expo.dev/go) on your mobile device.
   - An [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/) or [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/).
   In the output, you'll find options to open the app in a

## Project Structure

- **`app/`**: Contains the main screens of the app.
  - `tabs/log-mood.tsx`: The main mood tracking screen with graph and slider interactions.
  - `user-preferences.tsx`: The screen for customizing mood colors and selecting tracker types.
- **`components/`**: Reusable components like `MoodLoggerGraph`, `Slider`, `MoodTrackerColourPicker`, and `MoodTrackerPicker`.
- **`components/buttons/`**: All the button components used throughout the application.
- **`assets/utils/`**: Utility files for managing colors (`colour-utils.ts`) and tracker types (`tracker-utils.ts`).

## Customization

### Mood Colors
Users can customize mood colors through the **MoodTrackerColourPicker** component. Default colors are provided, but users can select their own or reset to defaults.

### Tracker Type
Users can choose between:
- **Graph**: Visual interaction with a draggable point.
- **Sliders**: Precise adjustments using sliders.
- **Both**: A combination of graph and sliders.

## Persistent Data

The app uses **AsyncStorage** to save and retrieve:
- Mood colors.
- Tracker type.
- Last logged mood values (pleasantness and energy).

This ensures user preferences are retained across sessions.
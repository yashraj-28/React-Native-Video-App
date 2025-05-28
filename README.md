# 🎬 React Native Video Sharing App

A modern mobile app built with **React Native** and **Expo**, allowing users to upload, play, bookmark, and search videos. The app uses **Appwrite** as the backend for authentication, video storage, and database management.

---

## 🚀 Features

- 🔐 User Authentication (Sign In / Sign Up)
- 🏠 Home feed to browse all uploaded videos
- 🔍 Search functionality to find videos by keyword
- 🎥 Upload videos from your device
- 🔖 Bookmark videos for later viewing
- 👤 Profile screen to view your uploaded videos and info
- 🌙 Clean UI with NativeWind (Tailwind CSS for React Native)

---

## 🧱 Tech Stack

| Technology         | Purpose                         |
|--------------------|----------------------------------|
| **React Native**   | Cross-platform mobile development |
| **Expo**           | Managed workflow and tools      |
| **Appwrite**       | Backend-as-a-service (auth, storage, DB) |
| **expo-av**        | Video playback functionality     |
| **expo-image-picker** | Pick videos for upload         |
| **expo-router**    | File-based navigation             |
| **nativewind**     | Tailwind CSS in React Native     |

---
Setup Instructions
```
git clone https://github.com/yourusername/react-native-video-app.git
cd react-native-video-app
npm install
# or
yarn install
```

```
npx expo start
```

##Appwrite Setup
- Create a new Appwrite Project
- Add your platforms (Android/iOS/Web)
- Enable Email/Password Auth
Create:
- Storage Bucket for videos
- Database with collections like videos, bookmarks, users
- Configure permissions accordingly

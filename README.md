# Paysync

A React Native application for managing payments, with persistent user profiles 
## Features
- Organize payments into folders (payable/receivable)
- Track payment status and due dates
- Persistent user profile with avatar selection
- Modular architecture with reusable components, custom hooks, and utility functions
- Error handling and state management using Redux

## Folder Structure
```
src/
  components/         # Reusable UI components
  screens/            # App screens (main UI logic)
  hooks/              # Custom React hooks
  services/           # App-wide services (e.g., storage)
  utils/              # Utility/helper functions
  global/reducers/    # Redux reducers and state
  assets/             # Static assets (images, avatars, etc.)
```

## Key Files
- `src/utils/paymentUtils.ts`: Utility functions for extracting and sorting payments
- `src/services/storageService.ts`: Singleton service for persistent storage (AsyncStorage)
- `src/hooks/useUserProfile.ts`: Custom hook for accessing user profile data
- `src/global/reducers/folderReducer.ts`: Redux reducer for folders and payments
- `src/components/`: Main UI components (e.g., Header, PaymentList)
- `src/screens/`: Main app screens (e.g., Home, FolderDetails)

## Getting Started

### Prerequisites
- Node.js (>= 14.x)
- Yarn or npm
- Expo CLI (if using Expo)

### Installation
```sh
git clone <your-repo-url>
cd Sortly
yarn install # or npm install
```

### Running the App
```sh
yarn start # or npm start
```
- Use the Expo Go app or an emulator to preview the app.

## Customization & Extensibility
- Add new folders or payment types by extending the Folder and Payment interfaces.
- Add new screens or components in their respective directories.
- Utilities and hooks are designed to be reusable and easy to extend.

## Code Quality
- All important files are documented with file headers and JSDoc comments.
- Consistent code style (run Prettier or your formatter of choice).

## License
MIT 
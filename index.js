import { registerRootComponent } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';

import App from './App';

function AppIndex() {
    return <PaperProvider>
        <App />
    </PaperProvider>
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(AppIndex);

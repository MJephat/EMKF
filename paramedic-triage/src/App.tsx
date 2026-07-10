
import { Provider } from "react-redux";
import { store } from './store/store';
import TriageScreen from './screens/TriageScreen';
import { initializeDatabase } from './database/database';
import { useEffect } from 'react';

export default function App() {
   useEffect(() => {
    initializeDatabase();
  }, []);

    return (

        <Provider store={store}>

            <TriageScreen />

        </Provider>

    );

}



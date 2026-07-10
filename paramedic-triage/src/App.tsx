
import { Provider } from "react-redux";
import { store } from './store/store';
import TriageScreen from './screens/TriageScreen';
import { initializeDatabase } from './database/database';
import { useEffect, useState } from 'react';

export default function App() {
const [ready, setReady] = useState(false);

   useEffect(() => {
    initializeDatabase();
    setReady(true);
  }, []);

    if (!ready) {
    return null;
  }


    return (

        <Provider store={store}>

            <TriageScreen />

        </Provider>

    );

}



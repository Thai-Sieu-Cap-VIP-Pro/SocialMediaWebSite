import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// import { store, persistor } from './app/store';
// import { Provider } from 'react-redux';

// ReactDOM.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <BrowserRouter>
//                 <App />
//             </BrowserRouter>
//         </Provider>
//     </React.StrictMode>,
//     document.getElementById('root')
// );

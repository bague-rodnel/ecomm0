import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Spinner from "./components/layout/Spinner";

(async () => {
  ReactDOM.render(
    <React.StrictMode>
      <Spinner />
    </React.StrictMode>,
    document.getElementById("root")
  );

  const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER,
    transition: transitions.SCALE,
  };

  const { data } = await axios.get(
    `${process.env.REACT_APP_API_HOST}/api/payments/stripeapi`
  );
  const stripeAPIKey = data.stripeAPIKey;
  const stripePromise = loadStripe(stripeAPIKey);

  ReactDOM.render(
    <React.StrictMode>
      <Elements stripe={stripePromise}>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </Provider>
      </Elements>
    </React.StrictMode>,
    document.getElementById("root")
  );
})();

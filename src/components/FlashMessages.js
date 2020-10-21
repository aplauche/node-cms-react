import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store";

function FlashMessages(props) {
  const { appState, appDispatch } = useContext(Context);
  return (
    <div className="floating-alerts">
      {appState.flash.map((msg, index) => {
        return (
          <div key={index} className="floating-alert">
            {msg}
          </div>
        );
      })}
    </div>
  );
}

export default FlashMessages;

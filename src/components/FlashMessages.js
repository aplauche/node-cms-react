import React, { useEffect } from "react";

function FlashMessages(props) {
  return (
    <div className="floating-alerts">
      {props.messages.map((msg, index) => {
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

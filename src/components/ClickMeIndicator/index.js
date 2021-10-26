// Markup from https://loading.io/css/

import React from "react";
import './ClickMeIndicator.css'

export default function ClickMeIndicator() {
  return (
    <div className="lds-ripple-container">
      <div className="lds-ripple">
        <div></div><div>
      </div></div>
    </div>
  )
}
// Markup from https://loading.io/css/

import React from "react";
import './LoadingCompleteIndicator.css'

export default function LoadingCompleteIndicator() {
  return (
    <div className="lds-heart-container">
      <div className="lds-heart">
        <div></div>
      </div>
    </div>
  )
}
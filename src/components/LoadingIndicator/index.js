// Markup from https://loading.io/css/

import React from "react";
import './LoadingIndicator.css'

export default function LoadingIndicator() {
  return (
    <div className="lds-dual-ring-container">
      <div className="lds-dual-ring"></div>
    </div>
  )
}
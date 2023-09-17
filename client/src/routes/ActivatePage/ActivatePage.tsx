import React, { useState, useMemo, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

// - Taken from: https://github.com/dominicarrojado/react-typescript-otp-input
function ActivatePage() {
  const TOKEN_MAX_LENGTH = 6;
  const ALPHA_NUMERIC_REG = /^[0-9a-zA-Z]$/;
  const [token, setToken] = useState("");
  const location = useLocation();

  useEffect(() => {
    console.log(location, "hello?");
  }, []);

  const valueItems = useMemo(() => {
    const valueArray = token.split("");
    const inputCharArr: Array<string> = [];

    for (let i = 0; i < TOKEN_MAX_LENGTH; i++) {
      const inputChar = valueArray[i];

      if (ALPHA_NUMERIC_REG.test(inputChar)) {
        inputCharArr.push(inputChar);
      } else {
        inputCharArr.push("");
      }
    }

    return inputCharArr;
  }, [token]);

  function focusToPrevInput(target: HTMLElement) {
    const prevElementSibling =
      target.previousElementSibling as HTMLInputElement | null;
    if (prevElementSibling) {
      prevElementSibling.focus();
    }
  }
  function focusToNextInput(target: HTMLElement) {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;
    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  }

  function inputOnChange(
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) {
    let targetValue = event.target.value.trim();
    const isTargetValueChar = ALPHA_NUMERIC_REG.test(targetValue);

    if (!isTargetValueChar && targetValue !== "") {
      return;
    }
    const nextInputEl = event.target
      .nextElementSibling as HTMLInputElement | null;
    // only delete char if next input element has no value
    if (!isTargetValueChar && nextInputEl && nextInputEl.value !== "") {
      return;
    }

    targetValue = isTargetValueChar ? targetValue : " ";
    const targetTokenTotalLength = targetValue.length;

    if (targetTokenTotalLength === 1) {
      const newValue =
        token.substring(0, idx) + targetValue + token.substring(idx + 1);
      setToken(newValue);

      if (!isTargetValueChar) {
        return;
      }

      focusToNextInput(event.target);
    } else if (targetTokenTotalLength === TOKEN_MAX_LENGTH) {
      setToken(targetValue);

      event.target.blur();
    }
  }
  function inputOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      return focusToPrevInput(target);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      return focusToNextInput(target);
    }

    const targetValue = target.value;

    // keep the selection range position if the same char was typed
    target.setSelectionRange(0, targetValue.length);

    if (event.key !== "Backspace" || targetValue !== "") {
      return;
    }

    focusToPrevInput(target);
  }
  function inputOnFocus(event: React.FocusEvent<HTMLInputElement>) {
    // keep focusing back until previous input element has value
    const prevInputEl = event.target
      .previousElementSibling as HTMLInputElement | null;
    if (prevInputEl && prevInputEl.value === "") {
      return prevInputEl.focus();
    }

    event.target.setSelectionRange(0, event.target.value.length);
  }

  return (
    <div>
      {valueItems.map((char, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="text"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={TOKEN_MAX_LENGTH}
          value={char}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
}

export default ActivatePage;

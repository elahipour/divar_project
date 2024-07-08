function isItRequestTimer() {
  if (!JSON.parse(localStorage.getItem("request_timer"))) {
    localStorage.setItem("request_timer", JSON.stringify(30));
  }
  return JSON.parse(localStorage.getItem("request_timer"));
}

export { isItRequestTimer };

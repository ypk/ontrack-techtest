function DateAPI () {
  const renderedTime = function () {
    const renderedTime = new Date(Date.now()).toLocaleString();
    return renderedTime;
  }
  return {
    getCurrentRenderedTime: renderedTime
  };
}

export default DateAPI;

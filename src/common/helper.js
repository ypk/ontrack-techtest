const getBookAuthor = (author) =>
  author.length > 0 ? author.join(", ") : author.pop();

let timer;

const throttle = (func, delay) => {
  if (timer) {
    return;
  }

  timer = setTimeout(function () {
    func();
    timer = undefined;
  }, delay);
};

export { getBookAuthor, throttle };

const debounce = (clbk: Function, ms = 300) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => clbk.apply(this, args), ms);
  };
};

export default debounce;

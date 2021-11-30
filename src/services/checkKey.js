const checkKey = ({ keyCode }, callback) => {
  const enterKeyCode = 13;
  if (keyCode === enterKeyCode) callback();
};

export default checkKey;

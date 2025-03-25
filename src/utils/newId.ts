let count = 20;

function newId() {
  count++;
  return count.toString();
}

export { newId };

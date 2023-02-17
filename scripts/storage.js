//функція збереження значення в localStorage
function save(key, value) {
  //спочатку треба перетворити дані(value) які до нас приходять в json
  try {
    const serializedData = JSON.stringify(value);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    console.log(err);
  }
}

function load(key) {
  //для завантаження даних з ЛС
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
  }
}
export { save, load };

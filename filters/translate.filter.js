export default name => {
  switch (name) {
    case "shirts":
      name = "Футболки";
      break;
    case "hoodies":
      name = "Толстовки";
      break;
    case "product":
      name = "Товары";
      break;
    case "":
      name = "Главная";
      break;
  }
  return name;
};

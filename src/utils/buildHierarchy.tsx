export const buildHierarchy = () => {
  // // Создаем словарь для быстрого доступа по id
  // const map = {};
  // data.forEach((item) => {
  //   map[item.id] = { ...item, children: [] };
  // });

  // // Создаем иерархию
  // const result = [];
  // data.forEach((item) => {
  //   if (item.manager_id === 0) {
  //     // Если это корневой элемент, добавляем в результат
  //     result.push(map[item.id]);
  //   } else if (map[item.manager_id]) {
  //     // Если есть менеджер, добавляем в его Children
  //     map[item.manager_id].children.push(map[item.id]);
  //   }
  // });

  // return result;
  return [];
};

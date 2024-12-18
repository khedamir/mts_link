interface Employee {
  id: number;
  full_name: string;
  number: string;
  address: string;
  city: string;
  job_name: string;
  role_name: string;
  parent_id: number;
  department_name: string;
  block_name: string;
  subdivision_name: string;
  office_name: string;
  children: Employee[] | null;
}

export const buildHierarchy = (data: Employee[]): Employee[] => {
  // Создаем словарь для быстрого доступа по id
  const map: { [key: number]: Employee } = {};
  data.forEach((item) => {
    map[item.id] = { ...item, children: [] }; // Инициализируем массив children
  });

  const result: Employee[] = [];
  data.forEach((item) => {
    if (item.parent_id === 0) {
      // Если нет родителя, добавляем в корень
      result.push(map[item.id]);
    } else if (map[item.parent_id]) {
      // Если есть родитель, добавляем в его children
      map[item.parent_id].children?.push(map[item.id]);
    }
  });

  return result;
};

export const buildHierarchyFromNestedArrays = (
  nestedData: Employee[][]
): Employee[] => {
  // Объединяем все массивы в один
  const flatData = nestedData.flat();

  // Создаем словарь для быстрого доступа по id
  const map: { [key: number]: Employee } = {};
  flatData.forEach((item) => {
    map[item.id] = { ...item, children: [] }; // Инициализируем массив children
  });

  // Создаем иерархию
  const result: Employee[] = [];
  flatData.forEach((item) => {
    if (item.parent_id === 0) {
      // Если элемент корневой, добавляем его в результат
      result.push(map[item.id]);
    } else if (map[item.parent_id]) {
      // Если элемент имеет родителя, добавляем его в children родителя
      map[item.parent_id].children?.push(map[item.id]);
    }
  });

  return result;
};

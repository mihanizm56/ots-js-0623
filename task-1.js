// Задание 1.
// Написать функцию maxItemAssociation(), получающую исторические данные покупок пользователей и возвращающую максимальный список рекомендаций.
// Входные данные - массив исторических покупок пользователей [["a", "b"], ["a", "c"], ["d", "e"]]. То есть пользователь 1 купил "a" и "b".
// Пользователь 2 купил продукты "a", "c". Пользователь 3 купил продукты "d", "e".
// Надо найти максимальную группу рекомендаций. Группа рекомендаций - это продукты, которые был куплены другими пользователями при условии, если они пересекаются с исходным списком.
// Если количество рекомендаций в группах одинаковое - вернуть первую группу, из отсортированных в лексикографическом порядке.
// Решение:
// Группа рекомендаций 1 - ["a", "b", "c"]. Покупка "a" содержится в списке 2, поэтому весь список 2 может быть добавлен в рекомендации.
// Группа рекомендаций 2 - ["d", "e"].
// Ответ: ["a", "b", "c"].
// Пример 2:
// Входные данные: [
// ["q", "w", 'a'],
// ["a", "b"],
// ["a", "c"],
// ["q", "e"],
// ["q", "r"],
// ]
// Ответ ["a", "b", "c", "e", "q", "r", "w"] - это максимальная по пересечениям группа. Можно видеть, что первый массив пересекается со всеми остальными, и потому результат является всем множеством значений.

const maxItemAssociation = (allUsersItems) => {
    if (!allUsersItems.length) {
      return [];
    }
  
    // choose obj with inside objects for more performance search
    const itemAssociationGroups = {};
  
    allUsersItems.forEach((userItems, userItemsIndex) => {
      // find group for user items
      const groupNameForUserItems = Object.keys(itemAssociationGroups).reduce(
        (acc, groupName) => {
          if (acc) {
            return acc;
          }
  
          const areUserItemsInGroup = userItems.reduce(
            (userItemsAcc, userItem) =>
              userItemsAcc || itemAssociationGroups[groupName][userItem],
            false,
          );
  
          return areUserItemsInGroup ? groupName : acc;
        },
        '',
      );
  
      // enrich group for user items
      userItems.forEach((userItem) => {
        const filledGroupNameForUserItems =
          groupNameForUserItems || `${userItemsIndex}`;
  
        // create group
        if (!itemAssociationGroups[filledGroupNameForUserItems]) {
          itemAssociationGroups[filledGroupNameForUserItems] = {};
        }
  
        itemAssociationGroups[filledGroupNameForUserItems][userItem] = true;
      });
    });
  
    // find max group length
    const mostFilledGroup = Object.values(itemAssociationGroups).reduce(
      (acc, itemAssociationGroupName) => {
        const itemAssociationGroupKeys = Object.keys(itemAssociationGroupName);
  
        return itemAssociationGroupKeys.length > acc.length
          ? itemAssociationGroupKeys
          : acc;
      },
      [],
    );
  
    return mostFilledGroup.sort();
  };
  
  console.log(
    maxItemAssociation([
      ['q', 'w', 'a'],
      ['a', 'b'],
      ['a', 'c'],
      ['q', 'e'],
      ['q', 'r'],
    ]),
  );
  
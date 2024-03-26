export function getNumberOfGroupsAssignedForNumber(number, groups) {
    return groups.reduce((accumulator, row) =>
      accumulator + (row.get(number) > 0 ? 1 : 0), 0);
  }
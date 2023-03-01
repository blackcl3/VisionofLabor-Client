export function optionsMap(Arr) {
  try {
    const options = Arr.map((obj) => ({
      value: obj.id,
      label: obj.full_name,
    }));
    return options;
  } catch {
    return false;
  }
}

export function householdMap(Arr) {
  try {
    const options = Arr.map((obj) => ({
      value: obj.id,
      label: obj.name,
    }));
    return options;
  } catch {
    return false;
  }
}

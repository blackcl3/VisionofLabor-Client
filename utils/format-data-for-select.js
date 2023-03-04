function optionsMap(Arr) {
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

function householdMap(Arr) {
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

function householdObjectChangeForReactSelect(obj) {
  try {
    const newObj = {
      value: obj.id,
      label: obj.name,
    };
    return newObj;
  } catch {
    return false;
  }
}

export { optionsMap, householdMap, householdObjectChangeForReactSelect };

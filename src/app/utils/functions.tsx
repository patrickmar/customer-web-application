import moment from "moment";

export const Greeting = () => {
  const time = moment().hours();
  const displayTime =
    time < 12
      ? "Good Morning,"
      : time < 16
      ? "Good Afternoon,"
      : time < 20
      ? "Good Evening,"
      : "Good Evening,";
  return displayTime;
  // if (time < 12) {
  //     return "Good Morning,";
  //   }else if (time < 16) {
  //     return "Good Afternoon,";
  //   } else if (time < 20) {
  //     return "Good Evening,";
  //   } else {
  //     return "Good Evening,";
  //   }
};

export const ordinalNumbers = (number: number) => {
  return `${
    number == 1
      ? number + "st"
      : number == 2
      ? number + "nd"
      : number == 3
      ? number + "rd"
      : number + "th"
  }`;
};

export const convertToObj = (obj: any, path: any, val: any) => {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const lastObj = keys.reduce(
    (obj: any, key: any) => (obj[key] = obj[key] || {}),
    obj
  );
  lastObj[lastKey] = val;
};

// Define a custom function to set nested properties
export const setNestedProperty = (
  object: Record<string, any>,
  path: string,
  value: any
) => {
  const keys = path.split(".");
  let currentObject = object;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (!currentObject[key]) {
      currentObject[key] = {};
    }
    currentObject = currentObject[key];
  }

  currentObject[keys[keys.length - 1]] = value;
};

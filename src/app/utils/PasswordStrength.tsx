// has number
const hasNumber = (number: string) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number: string) =>
  new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number: string) =>
  new RegExp(/[!#@$%^&*)(+=,[\]}{\\/:;><?'"|`~._-]/).test(number);

// set color based on password strength
export const strengthColor = (count: number) => {
  if (count == 0) return { label: "", percent: 0, color: "", bgColor: "" };
  if (count < 2)
    return {
      label: "Poor",
      percent: 20,
      color: "text-red-600",
      bgColor: "bg-red-600",
    };
  if (count < 3)
    return {
      label: "Weak",
      percent: 40,
      color: "text-orange-500",
      bgColor: "bg-orange-500",
    };
  if (count < 4)
    return {
      label: "Normal",
      percent: 60,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400",
    };
  if (count < 5)
    return {
      label: "Good",
      percent: 80,
      color: "text-green-500",
      bgColor: "bg-green-500",
    };
  if (count < 6)
    return {
      label: "Strong",
      percent: 100,
      color: "text-green-800",
      bgColor: "bg-green-800",
    };
  return {
    label: "Poor",
    color: "text-red-600",
    percent: 0,
    bgColor: "bg-red-600",
  };
};

// password strength indicator
export const strengthIndicator = (number: string) => {
  let strengths = 0;
  if (number.length >= 1) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};

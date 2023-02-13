export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function splitByUppercase(str: string) {
  return str.split(/(?=[A-Z])/).join(' ');
}

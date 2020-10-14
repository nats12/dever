
/**
 *
 *
 * @param {*} oldVersion
 * @param {*} newVersion
 * @returns
 */
export const isMajorMinorPatch = (oldVersion: any, newVersion: any) => {


  oldVersion = oldVersion.split('.');
  newVersion = newVersion.split('.');

  const result = oldVersion.filter((value1: string) => 
              !newVersion.some((value2: string) => 
                value2 === value1));

  switch(oldVersion.indexOf(result[0])) {
    case 0:
      return "MAJOR";
    case 1:
      return "MINOR";
    default:
      return "PATCH";
  }
}
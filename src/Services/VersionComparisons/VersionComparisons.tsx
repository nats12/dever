
/**
 *
 *
 * @param {*} a
 * @param {*} b
 * @returns
 */
export const CompareVersionDesc = (a: any, b: any) => {
    
    const as = a.name.split('.').map(Number)
    const bs = b.name.split('.').map(Number)

    return (bs[0]||0) - (as[0]||0)
        || (bs[1]||0) - (as[1]||0)
        || (bs[2]||0) - (as[2]||0)
}



/**
 *
 *
 * @param {*} versions
 * @returns
 */
export const FindLatestVersion = (versions: any) => { 
      
    return [...versions].sort(CompareVersionDesc)[0][0]
  }
  

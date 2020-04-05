


export const cmpVersionDesc = (a: any, b: any) => {
    const as = a.split('.').map(Number)
    const bs = b.split('.').map(Number)

    return (bs[0]||0) - (as[0]||0)
        || (bs[1]||0) - (as[1]||0)
        || (bs[2]||0) - (as[2]||0)
  }

export const latestVersion = (versions: any) => { 

    // versions.map((v:any) => console.log(v));

      const ver = versions.filter((v: any) => {
          return !v.includes('-');
          
      });


    return [...ver].sort(cmpVersionDesc)[0]

    
}
export const slugHex = () => {
    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }
    // hex 5 digits: [10000-fffff]
    let x = 65536
    let y = 1048575
    return (getRandomInt(x,y).toString(16) + '-')
  }
export const convertDateFormat =(initialDate: Date) => {
    const initialDateObj = new Date(initialDate);
    const year = initialDateObj.getFullYear();
    const month = String(initialDateObj.getMonth() + 1).padStart(2, '0');
    const day = String(initialDateObj.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
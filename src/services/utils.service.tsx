export const getLocaleDate = (inputDate?: string) => {
    if(!inputDate){
        return '';
    }
    try{
        const currentDate = new Date(inputDate);
        const month = currentDate.getUTCMonth() + 1;
        const year = currentDate.getUTCFullYear();
        const date = currentDate.getUTCDate();
        return `${date}/${month}/${year}`;
    }
    catch{
        return '';
    }
  }
  
export const generatorRandomId = () => {
    let randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    let uniqid = randLetter + Date.now();
    return(uniqid);
};

export const ccyFormat = (num: number) => {
    return `${num.toFixed(2)}`;
};
export const subtotal = (items: any) => {
    return items.map(({total}:any) => total).reduce((sum: any, i: any) => sum + i, 0);
} 
export const priceRow = (qty: number, unit: number) => {
    return qty * unit;
}
export const generateRandomDate = () => 
{ return (new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))).toLocaleDateString('pt-BR')}; 
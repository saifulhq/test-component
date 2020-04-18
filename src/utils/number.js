/* eslint-disable prettier/prettier */
export const duit = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '0';
};

export default {};

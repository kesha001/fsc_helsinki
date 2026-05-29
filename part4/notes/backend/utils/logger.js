const info = (...props) => {
    if (process.env.NODE_ENV !== 'test'){
        console.log(...props);
    }   
};

const error = (...props) => {
    if (process.env.NODE_ENV !== 'test'){
        console.log(...props);
    } 
};

module.exports = { info, error };

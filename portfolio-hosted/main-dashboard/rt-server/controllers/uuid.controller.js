

import cuid from 'cuid';


const generateCUID = (req, res) => {
    const newUUID = cuid()
    console.log(`Generated CUID: ${newUUID}`);
    return newUUID;


}

console.log(generateCUID());


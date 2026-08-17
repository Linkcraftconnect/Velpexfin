const sharp = require('sharp');

sharp('public/Images/banking-dashboard.png')
    .resize({
        width: 1200,
        withoutEnlargement: true,
    })
    .webp({
        quality: 82,
    })
    .toFile('public/Images/banking-dashboard.webp')
    .then((info) => {
        console.log('Created:', info);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
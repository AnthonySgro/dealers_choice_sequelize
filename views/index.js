const html = require("html-template-tag");

module.exports = () => {
    const htmlEx = html`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Dealers Choice Sequelize</title>
            </head>
            <body>
                <h1>Sgro</h1>
            </body>
        </html>
    `;
    return htmlEx;
};

const queryParser = {
    rebuild: (query) => {
        const queryObj = {};
        Object.keys(query).map((key, index) => {
            switch (key) {
                case 'filter':
                    Object.assign(queryObj, query[key]);
                    break;
                case 'page':
                case 'per_page':
                    break;
                default:
                    Object.assign(queryObj, {
                        [key]: new RegExp(query[key], "i")
                    });
            }

        });

        return queryObj;
    }
};

module.exports = queryParser;
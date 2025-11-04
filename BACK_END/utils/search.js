/**
 * Search for a keyword inside any string property of objects in an array
 * @param {Array} array - list of objects to search in
 * @param {String} keyword - search term
 * @returns {Array} - filtered matching objects
 */
function searchParamInArray(array, keyword) {
    if (!keyword || !array) return [];

    const lowerKey = keyword.toLowerCase();

    return array.filter(item => {
        // On boucle sur chaque propriété de l'objet
        for (const key in item) {
            const value = item[key];

            // On ne cherche que dans les valeurs qui sont du texte
            if (typeof value === 'string') {
                // Recherche approximative insensible à la casse
                if (value.toLowerCase().includes(lowerKey)) {
                    return true;
                }
            }
        }
        return false;
    });
}

module.exports = { searchParamInArray };


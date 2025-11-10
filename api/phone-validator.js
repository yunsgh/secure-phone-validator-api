// api/phone-validator.js
const PREFIXES_DB = require('../data-prefixes.json'); // Importation de la base de données

// Fonction de nettoyage (enlève les espaces, les tirets, et le signe +)
const cleanNumber = (num) => String(num).replace(/[^\d]/g, '');

module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    const { phone_number } = req.query;

    if (!phone_number) {
        return res.status(400).json({
            success: false,
            error: "Please provide the 'phone_number' parameter (including country code)."
        });
    }

    const cleanNum = cleanNumber(phone_number);

    // 1. Détecter le Code Pays (jusqu'à 3 chiffres, ex: 33, 49, 212)
    let countryCode = null;
    let numberBody = cleanNum;

    // Tentative de trouver le code pays (la méthode la plus simple)
    if (cleanNum.length > 5) {
        if (PREFIXES_DB[cleanNum.substring(0, 3)]) countryCode = cleanNum.substring(0, 3);
        else if (PREFIXES_DB[cleanNum.substring(0, 2)]) countryCode = cleanNum.substring(0, 2);
    }
    
    if (!countryCode) {
        return res.status(404).json({
            success: false,
            error: "Invalid or unsupported country code detected."
        });
    }

    const countryData = PREFIXES_DB[countryCode];
    numberBody = cleanNum.substring(countryCode.length);
    
    // 2. Déterminer le Type de Ligne (Mobile/Fixe)
    let lineType = 'Unknown';
    const firstDigit = numberBody.substring(0, 1);
    const firstTwoDigits = numberBody.substring(0, 2);

    if (countryData.mobile_prefix.includes(firstDigit) || countryData.mobile_prefix.includes(firstTwoDigits)) {
        lineType = 'Mobile';
    } else if (countryData.fixed_prefix.includes(firstDigit) || countryData.fixed_prefix.includes(firstTwoDigits)) {
        lineType = 'Fixed';
    }

    // 3. Validation de la Longueur (Exemple simple)
    const isValidStructure = (numberBody.length >= 8 && numberBody.length <= 11);

    res.status(200).json({
        success: true,
        validation: {
            is_valid_structure: isValidStructure,
            country_code: countryCode,
            country_name: countryData.country,
            line_type: lineType,
            query_number: phone_number
        }
    });
};

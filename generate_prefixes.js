// generate_prefixes.js
// Script pour générer data-prefixes.json à partir d'une source universelle.

const fs = require('fs');
const path = require('path');

// NOTE: Cette liste est un exemple minimal. La version complète nécessite de scraper
// ou d'importer une liste complète de l'ITU (Union Internationale des Télécommunications).
// Pour la démonstration, nous utilisons l'extrait stable et ajoutons une logique de formatage.
const RAW_PREFIXES = {
    "1": { "country": "USA/Canada", "length": 10, "mobile_prefix": ["2", "3", "4", "5", "6", "7", "8", "9"], "fixed_prefix": ["2", "3", "4", "5", "6", "7", "8", "9"] },
    "33": { "country": "France", "length": 9, "mobile_prefix": ["6", "7"], "fixed_prefix": ["1", "2", "3", "4", "5", "9"] },
    "44": { "country": "United Kingdom", "length": 10, "mobile_prefix": ["7"], "fixed_prefix": ["1", "2"] },
    "49": { "country": "Germany", "length": 10, "mobile_prefix": ["15", "16", "17"], "fixed_prefix": ["2", "3", "4", "5", "6", "7", "8", "9"] },
    "212": { "country": "Morocco", "length": 9, "mobile_prefix": ["6", "7"], "fixed_prefix": ["5"] },
    // AJOUTER ICI LE RESTE DES 200+ PAYS (manuellement ou via import d'une liste publique)
};

function generatePrefixData() {
    console.log('Génération de la base de données de préfixes...');
    
    // Le script ferait ici la logique complexe de VRAI scraping/import de l'ITU
    // Pour l'instant, il formate simplement notre extrait stable.
    
    const outputFilePath = path.join(__dirname, 'data-prefixes.json');
    
    try {
        fs.writeFileSync(outputFilePath, JSON.stringify(RAW_PREFIXES, null, 4));
        console.log(`✅ Fichier data-prefixes.json créé avec ${Object.keys(RAW_PREFIXES).length} entrées.`);
    } catch (err) {
        console.error("❌ Erreur lors de l'écriture du fichier:", err);
    }
}

// Exécution du script
generatePrefixData();

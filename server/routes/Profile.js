const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function fetchProfileData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Profile not found');
    const html = await response.text();
    const $ = cheerio.load(html);

    const profileName = $('.actual_persona_name').text().trim();
    const images = $('.playerAvatarAutoSizeInner img').toArray();
    let profilePictureUrl = images.length ? $(images[0]).attr('src') : ''; // Default to the first image

    if (profileName && profilePictureUrl) {
        return { profileName, profilePictureUrl };
    }
    throw new Error('Profile data incomplete');
}

router.get('/', async (req, res) => {
    const { steamId } = req.query;

    try {
        let profileData;
        const customUrl = `https://steamcommunity.com/id/${steamId}`;
        const numericIdUrl = `https://steamcommunity.com/profiles/${steamId}`;

        // Attempt to fetch using the custom URL format
        try {
            profileData = await fetchProfileData(customUrl);
        } catch (error) {
            // If the custom URL fails, try the numeric ID format
            console.log(`Fetching using custom URL failed, trying numeric ID. Error: ${error.message}`);
            profileData = await fetchProfileData(numericIdUrl);
        }

        res.json(profileData);
    } catch (error) {
        console.error('Error fetching Steam profile:', error);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;

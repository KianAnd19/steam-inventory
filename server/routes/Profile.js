const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cheerio = require('cheerio');

router.get('/', async (req, res) => {
    const { steamId } = req.query;

    try {
        // Assuming steamId is a custom URL part or numeric ID
        const apiUrl = `https://steamcommunity.com/id/${steamId}`; // Adjust URL based on the correct format
        console.log(apiUrl); // Helps in debugging to make sure URL is correct
        const response = await fetch(apiUrl);
        const html = await response.text(); // Get HTML content
        const $ = cheerio.load(html);

        // Get the profile name
        const profileName = $('.actual_persona_name').text().trim();

        // Find all images within the specified container(s) and select the second one if available
        const images = $('.playerAvatarAutoSizeInner img').toArray(); // Adjust selector if necessary
        let profilePictureUrl = '';
        if (images.length >= 2) {
            // If there are at least two images, select the second one
            profilePictureUrl = $(images[1]).attr('src');
        } else if (images.length === 1) {
            // If there is only one image, use it as a fallback
            profilePictureUrl = $(images[0]).attr('src');
        }

        // Check if the profile name and picture URL have been successfully retrieved
        if (profileName && profilePictureUrl) {
            res.json({ profileName, profilePictureUrl });
        } else {
            res.status(404).send('Profile not found');
        }
    } catch (error) {
        console.error('Error fetching Steam profile:', error);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;

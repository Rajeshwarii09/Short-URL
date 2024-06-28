const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' });

   // const uid = new ShortUniqueId();
    const shortID = nanoid(10);

    try {
        await URL.create({
            shortId: shortID, 
            redirectURL: body.url,
            visitHistory: []
        });

        return res.render("home",{
            id: shortID,
        })

        return res.json({ id: shortId }); // Fix variable name
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleGetAnalytics(req, res) {

	const shortId = req.params.shortId;
	await URL.findOne({shortId});
	return res.json ({ totalClicks:visitHistory.length, analytics: result.visitHistory,}) ;
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics, };

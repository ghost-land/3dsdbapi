const express = require('express');
const router = express.Router();

// Enhanced uptime calculation to include years, months, days
router.get('/uptime', (req, res) => {
    const now = new Date();
    const uptimeInSeconds = Math.floor((now - req.serverStartTime) / 1000);

    const years = Math.floor(uptimeInSeconds / (365 * 24 * 3600));
    const months = Math.floor((uptimeInSeconds % (365 * 24 * 3600)) / (30 * 24 * 3600));
    const days = Math.floor((uptimeInSeconds % (30 * 24 * 3600)) / (24 * 3600));
    const hours = Math.floor((uptimeInSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = uptimeInSeconds % 60;

    let uptimeMessage = 'Server uptime is';
    if (years) uptimeMessage += ` ${years} years,`;
    if (months) uptimeMessage += ` ${months} months,`;
    if (days) uptimeMessage += ` ${days} days,`;
    if (hours) uptimeMessage += ` ${hours} hours,`;
    if (minutes) uptimeMessage += ` ${minutes} minutes,`;
    uptimeMessage += ` and ${seconds} seconds.`;

    res.json({ uptime: uptimeMessage });
});

module.exports = router;

const adsWeb = {
    getHome: async (req, res) => {
        try {
            res.status(200).render('home', { name: 'Ricardo' });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err,
            });
        }
    },
    getFavorites: async (req, res) => {
        try {
            res.status(200).render('favorites', { name: 'Ricardo' });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err,
            });
        }
    },
    getProfiles: async (req, res) => {
        try {
            res.status(200).render('profiles', { name: 'Ricardo' });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err,
            });
        }
    },
    getDashboard: (req, res) => {
        try {
            res.status(200).render('createAd', { name: 'Ricardo' });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err,
            });
        }
    }


};

module.exports = adsWeb;

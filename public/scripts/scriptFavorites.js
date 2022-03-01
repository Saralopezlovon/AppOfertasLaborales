// Guarda la info de la vista (data de los anuncios en una variable)
if (typeof document !== 'undefined') {
    document.querySelectorAll('.ad').forEach(item => {
        item.addEventListener('click', e => {
            let ul = e.currentTarget;
            const adsData = {
                title: ul.querySelector('li.title').innerText,
                company: ul.querySelector('li.company').innerText,
                location: ul.querySelector('li.location').innerText,
                salary: ul.querySelector('li.title').innerText,
                description: ul.querySelector('li.description').innerText,
                image: ul.querySelector('li img.imagen').src,
                link: ul.querySelector('li a.link').href,
            };
            saveNewFavorite(adsData).then(data => console.log(data));
        });
    });
}

const saveNewFavorite = async adsData => {
    try {
        const data = await fetch('http://localhost:3000/user/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adsData),
        });
        const res = await data.json();
        // console.log(res)
        return res;
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
};


if (typeof document !== 'undefined') {
    const adsData = document.querySelectorAll('.ad').forEach(item => {
        item.addEventListener('click', e => {
            let ul = e.currentTarget;
            return {
                title: ul.querySelector('li.title').innerText,
                company: ul.querySelector('li.company').innerText,
                location: ul.querySelector('li.location').innerText,
                salary: ul.querySelector('li.title').innerText,
                description: ul.querySelector('li.description').innerText,
                image: ul.querySelector('li img.imagen').src,
                link: ul.querySelector('li a.link').href,
            };
        });
    });
}



// const postNewProduct = async  (product) => {
//     try {
//         const data = await fetch('http://localhost:3000/user/favorites',{
//             method:"POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body:JSON.stringify(product)
//         })
//         const res = await data.json()
//         return res

//     } catch (error) {
//         console.log(`ERROR: ${error.stack}`);
//     }
// }




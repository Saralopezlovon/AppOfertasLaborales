//Borrar favorito
// if (typeof document !== 'undefined') {
//     document.querySelectorAll('.favoriteCard').forEach(item => {
//         item.addEventListener('click', e => {
//             let ul = e.currentTarget;
//             const linkFavoriteData = {
//                 link: ul.querySelector('li a.link').href,
//             };
//             console.log("Acabas de darle a borrar"+ linkFavoriteData )
//             // deleteFavorite(linkFavoriteData).then(data => console.log(data)); //Llamada al fetch

//         });
//     });
// }

// const deleteFavorite = async linkFavoriteData => {
//     try {
//         const data = await fetch('http://localhost:3000/user/favorites', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(linkFavoriteData),
//         });
//         const res = await data.json();
//         // console.log(res)
//         return res;
//     } catch (error) {
//         console.log(`ERROR: ${error.stack}`);
//     }
// };
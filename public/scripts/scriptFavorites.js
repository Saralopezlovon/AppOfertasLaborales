
if(typeof document !== "undefined"){

const title = document.querySelectorAll('.ad').forEach(item => {
    item.addEventListener('click', e => { 
        let ul = e.currentTarget;
        let titulo = ul.querySelector('li.title').innerText
        console.log(titulo)
       
    })})
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




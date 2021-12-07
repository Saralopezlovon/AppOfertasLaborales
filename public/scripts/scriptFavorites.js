const express = require('express');
app.use(express.urlencoded({ extended: false })); //IMPORTANTE

// document.querySelectorAll('ul').forEach(li => {
//     li.addEventListener('click', event => {   
//         for (let i = 0; i < item.length; i++){
//             const title = document.querySelector('li[class="title"]')
//             console.log(title)
//             return title
//         }
//     })
//   })

// const saveToFavorite = () => {
//     let lists = document.querySelectorAll('ul')
//     console.log(lists)
//     for (let i = 0; i < favButton.length; i++){
//         const title = document.querySelector('li[class="title"]')[i]
//         console.log(title)
//     }
// }

const saveToFavorite = (req, res) => {
    console.log(req.body)
}
saveToFavorite()
// const favButton= document.getElementsByClassName('btnFavorite').addEventListener('click', saveToFavorite)
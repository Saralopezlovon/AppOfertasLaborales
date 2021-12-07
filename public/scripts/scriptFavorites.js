const adTitle = () =>{
document.querySelectorAll('.ad').forEach(item => {
    item.addEventListener('click', e => {
        // console.log(e.currentTarget)
        let data = e.currentTarget;
        document.querySelector(`${data} li[class=title]`).innerText;
    })})
}

// const adTitle = () =>{

//     const adsElements = document.querySelectorAll('.ad .title');
    
//     const adtitleDef = adsElements.forEach((adCard, i) => {
//         adCard.addEventListener('click', () => adCard.innerText);
//     });

//     return adtitleDef 
// }


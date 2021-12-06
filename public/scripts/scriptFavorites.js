

document.querySelectorAll('.ad').forEach(item => {
    item.addEventListener('click', event => {   
        
        const titles = document.querySelectorAll('li[class="title"]')
        titles.forEach((title, i) =>{            
            return title[i].innerText
        })

        console.log(titles)

    })
  })
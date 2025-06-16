let productCounter

const storedCounter = localStorage.getItem('productCount')

if (storedCounter !== null) {
    productCounter = parseInt(storedCounter, 10)
} else {
    productCounter = 0
    localStorage.setItem('productCount', productCounter.toString())
}

function createProduct(productData) {
    productCounter++
    localStorage.setItem('productCount', productCounter.toString())
    const productKey = `product_${productCounter}`
    localStorage.setItem(productKey, JSON.stringify(productData))
}


function appendProducts() {
    const ProductsContainer = document.querySelector('.products')
    ProductsContainer.innerHTML = ''

    let allKeys = []
    for (let i = 0; i < localStorage.length; i++) {
        allKeys.push(localStorage.key(i))
    }

    allKeys.sort((a, b) => {
        const numA = parseInt(a.replace('product_', ''), 10)
        const numB = parseInt(b.replace('product_', ''), 10)

        if (isNaN(numA) && isNaN(numB)) {
            return a.localeCompare(b)
        }
        if (isNaN(numA)) return 1
        if (isNaN(numB)) return -1
        return numA - numB
    })

    allKeys.reverse()

    for (const key of allKeys) {
        if (key.startsWith('product_')) {
            try {
                const ProductJSON = localStorage.getItem(key)
                const ProductData = JSON.parse(ProductJSON)
                
                const ProductCard = document.createElement('div')
                ProductCard.classList.add('products__card')

                const imageBlock = document.createElement('div')
                imageBlock.classList.add('card__image-block')
                const image = document.createElement('img')
                image.classList.add('card__image')
                image.src = ProductData.image
                imageBlock.appendChild(image)
                ProductCard.appendChild(imageBlock)

                const descriptionBlock = document.createElement('div')
                descriptionBlock.classList.add('card__description')

                const metaDiv = document.createElement('div')
                metaDiv.classList.add('card__meta')

                const ratingDiv = document.createElement('div')
                ratingDiv.classList.add('card__rating')
                ratingDiv.textContent = ProductData.rating

                const valueDiv = document.createElement('div')
                valueDiv.classList.add('card__value')
                valueDiv.textContent = `${ProductData.value} ккал.`

                metaDiv.appendChild(ratingDiv)
                metaDiv.appendChild(valueDiv)
                descriptionBlock.appendChild(metaDiv)

                const nameDiv = document.createElement('div')
                nameDiv.classList.add('card__name')
                nameDiv.textContent = ProductData.name
                descriptionBlock.appendChild(nameDiv)

                const costDiv = document.createElement('div')
                costDiv.classList.add('card__cost')
                costDiv.textContent = ProductData.cost

                descriptionBlock.appendChild(costDiv)
                ProductCard.appendChild(descriptionBlock)
                ProductsContainer.appendChild(ProductCard)

            } catch (error) {
                console.error(`Ошибка при парсинге данных для ключа ${key}:`, error)
            }
        }
    }
}


const productsContainer = document.querySelector('.products')
if (!productsContainer) {
    console.error("Элемент с классом '.products' не найден в HTML. Пожалуйста, убедитесь, что он существует.")
} else {
    const hasProductsInLocalStorage = Array.from({length: localStorage.length}, (_, i) => localStorage.key(i))
                                        .some(key => key.startsWith('product_'))

    if (!hasProductsInLocalStorage) {
        console.log("Добавляем демонстрационные товары, так как localStorage пуст.")
        const first_product = {
            image : 'pictures/2.webp',
            rating : 4.94,
            value : 500,
            name : 'Стейк из грудки индейки охлажденный Зеленая Линия, 500г',
            cost : 450,
        }
        createProduct(first_product)

        const secondProduct = {
            image: 'pictures/1.webp',
            rating: 4.88,
            value: 148,
            name: 'Помидоры, 148г',
            cost: 148,
        }
        createProduct(secondProduct)
    }
    appendProducts()
}

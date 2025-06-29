let ProductCounter
let StoredCounter = localStorage.getItem('ProductCount')


if (StoredCounter !== null) {
    ProductCounter = parseInt(StoredCounter, 10)
} else {
    ProductCounter = 0
    localStorage.setItem('ProductCount', ProductCounter.toString())
}

function CreateProduct(ProductData) {
    ProductCounter++
    localStorage.setItem('ProductCount', ProductCounter.toString())
    let ProductKey = `product_${ProductCounter}`
    localStorage.setItem(productKey, JSON.stringify(ProductData))
}

function AppendProducts() {
    let ProductsContainer = document.querySelector('.products')
    ProductsContainer.innerHTML = ''

    let AllKeys = []
    for (let i = 0; i < localStorage.length; i++) {
        AllKeys.push(localStorage.key(i))
    }

    AllKeys.sort((a, b) => {
        let numA = parseInt(a.replace('product_', ''), 10)
        let numB = parseInt(b.replace('product_', ''), 10)

        if (isNaN(numA) && isNaN(numB)) {
            return a.localeCompare(b)
        }
        if (isNaN(numA)) return 1
        if (isNaN(numB)) return -1
        return numA - numB
    })

    AllKeys.reverse()

    for (let key of AllKeys) {
        if (key.startsWith('product_')) {
            try {
                let ProductJSON = localStorage.getItem(key)
                let ProductData = JSON.parse(ProductJSON)
                
                let ProductCardHTML = `
                    <div class="products__card">
                        <div class="card__image-block">
                            <img class="card__image" src="${ProductData.image}" alt="${ProductData.name}">
                        </div>
                        <div class="card__description">
                            <div class="card__meta">
                                <div class="card__rating">${ProductData.rating}</div>
                                <div class="card__value">${ProductData.value} ккал.</div>
                            </div>
                            <div class="card__name">${ProductData.name}</div>
                            <div class="card__cost">${ProductData.cost}</div>
                        </div>
                    </div>
                `
                ProductsContainer.insertAdjacentHTML('beforeend', ProductCardHTML)

            } catch (error) {
                console.error(`Ошибка при парсинге данных для ключа ${key}:`, error)
            }
        }
    }
}


let ProductsContainer = document.querySelector('.products')
if (!ProductsContainer) {
    console.error("Элемент с классом '.products' не найден в HTML. Пожалуйста, убедитесь, что он существует.")
} else {
    let HasProductsInLocalStorage = Array.from({length: localStorage.length}, (_, i) => localStorage.key(i))
                                        .some(key => key.startsWith('product_'))

    if (!HasProductsInLocalStorage) {
        console.log("Добавляем демонстрационные товары, так как localStorage пуст.")
        let FirstProducct = {
            image : 'pictures/2.webp',
            rating : 4.94,
            value : 500,
            name : 'Стейк из грудки индейки охлажденный Зеленая Линия, 500г',
            cost : 450,
        }
        CreateProduct(FirstProducct)

        let SecondProduct = {
            image: 'pictures/1.webp',
            rating: 4.88,
            value: 148,
            name: 'Помидоры, 148г',
            cost: 148,
        }
        CreateProduct(SecondProduct)
    }
    AppendProducts()
}

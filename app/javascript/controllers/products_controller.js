import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="products"
export default class extends Controller {
   static values = { size: String, product: Object }

   addToCart() {
    console.log("product:", this.productValue)
    // Adding the products that were added to the cart into our localStorage
    const cart = localStorage.getItem("cart") 
    if(cart) {
      const cartArray = JSON.parse(cart)
      const foundIndex = cartArray.findIndex(item => item.id === this.productValue.id && item.size === this.sizeValue)
      if (foundIndex >=0) {
        cartArray[foundIndex].quantity = parseInt(cartArray[foundIndex].quantity) + 1
      } else {
        cartArray.push([
            this.productValue.id,
            this.productValue.name,
            this.productValue.price,
            this.sizevalue,
            1
        ])
      }
      localStorage.setItem("cart", JSON.stringify(cartArray))
    } else {
      const cartArray= []
      cartArray.push({
        id: this.productValue.id,
        name: this.productValue.name,
        price: this.productValue.price,
        size: this.sizevalue,
        quantity: 1
      })
      localStorage.setItem("cart", JSON.stringify(cartArray)) 
    }
   }

   selectSize(e) {
    this.sieValue = e.target.value
    const selectedSizeEl = document.gretElementByTd("selected-size")
    selectedSizeEl.innerText = `Selected Size: ${this.sizeValue}`
   }
}

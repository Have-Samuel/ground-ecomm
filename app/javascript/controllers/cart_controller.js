import { Controller } from "@hotwired/stimulus"

console.log("cart controller initialized")
// Connects to data-controller="cart"
export default class extends Controller {
  initialize() {
    const cart = JSON.parse(localStorage.getItem("cart"))
    if (!cart) {
      return
    }
    let total = 0
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i]
      total += item.price * item.quantity
      const div = document.createElement("div")
      div.classList.add("mt-2")
      div.innertext = `Item: ${item.name} - $${item.price/100.0} - Size: ${item.size} - Quantity: ${item.quantity}`
      const deleteButton = document.createElement("button")
      deleteButton.innerText = "Remove"
      deleteButton.value = item.id
      deleteButton.classList.add("bg-gray-500","rounded","text-white","px-2","py-1","ml-2")
      deleteButton.addEventListener("click", this.removeFromCart)
      div.append(deleteButton)
      this.element.prepend(div)
    }
    const totalEl = document.createElement("div")
    totalEl.innerText = `Total: $${total/100.0}`
    let totalContainer= document.getElementById("total")
    totalContainer.append(totalEl)
  }

  clear() {
    localStorage.removeItem("cart")
    window.location.reload()
  }

  // REMOVING THE FROM THE CART
  removeFromCart(event) {
    const cart = JSON.parse(localStorage.getItem("cart"))
    const id = event.target.value
    const index = cart.findindex(item => item.id === id)
    cart.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(cart))
    window.location.reload()
  }

  // CHECKOUT
  checkout() {
     console.log("checkout")
    const cart = JSON.parse(localStorage.getItem("cart"))
    const payload = {
      authenticity_token: "",
      cart: cart
    }

    const csrfToken = document.querySelector("[name='csrf-token']").content

    fetch("/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken
      },
      body: JSON.stringify(payload)
    }).then(response => {
      if (response.ok) {
        window.location.href = body.url
      } else {
        const errorEl = document.createElement("div")
        errorEl.innerText = `There was an error processing your order.${body.error}`
        let errorContainer = document.getElementById("errorContainer")
        errorContainer.appendChild(errorEl)
      }
    })
  }
}



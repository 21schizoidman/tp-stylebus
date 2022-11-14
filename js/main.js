const main = async () => {
  const buttonLading = document.getElementById('button-destinos')
  buttonLading.addEventListener('click', () => window.location = "/pages/destinos.html")
}
document.addEventListener("DOMContentLoaded", main)

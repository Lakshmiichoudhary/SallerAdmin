'use strict';

const form = document.getElementById('productForm');
const link = 'https://crudcrud.com/api/987507c7d02f4805a8e3fdfd8970d2d6/AddProduct';
const productList = document.querySelector('#productList');

form.addEventListener('submit', addProduct);

async function addProduct(event) {
  event.preventDefault();

  const sellingPrice = event.target.elements.Sellingprice.value;
  const productName = event.target.elements.ProductName.value;
  const category = event.target.elements.category.value;

  const product = {
    sellingPrice,
    productName,
    category,
  };

  try {
    const response = await axios.post(link, product);
    displayProduct(response.data);

    // Clear form inputs
    event.target.elements.Sellingprice.value = '';
    event.target.elements.ProductName.value = '';
    event.target.elements.category.value = '';
  } catch (error) {
    console.error(error);
  }
}

function displayProduct(product) {

  const s = product.sellingPrice;
  const p = product.productName;
  const ca = product.category;

  let newItem = document.createElement('li');
  newItem.id = "ele";
  newItem.appendChild(document.createTextNode(`${s}, ${p}`));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  
  deleteButton.addEventListener('click', () => deleteProduct(product._id, newItem));
  newItem.appendChild(deleteButton);

  const categoryElement = document.getElementById(ca.replace(/ /g, '')); 

  if (categoryElement) {
    categoryElement.appendChild(newItem);
  } 
}

async function deleteProduct(productId, listItem) {
  try {
    await axios.delete(`${link}/${productId}`);
    listItem.remove();
  } catch (error) {
    console.error(error);
  }
}
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await axios.get(link); // Fetch data from the API
    const productData = response.data;

    // Check if there is data to display
    if (productData && productData.length > 0) {
    
      // Display the fetched data
      productData.forEach((product) => {
        displayProduct(product);
      });
    }
  } catch (error) {
    console.error(error);
  }
});


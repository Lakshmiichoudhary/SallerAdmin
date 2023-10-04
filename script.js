'use strict';

// Creating element variables
const form = document.getElementById('productForm');
const link = 'https://crudcrud.com/api/a486394b3d7f4731abd853dcffe34050/AddProduct';
const productList = document.getElementById('productList');

// Add an event listener to the form for form submission
form.addEventListener('submit', addProduct);

// Function to handle form submission
async function addProduct(event) {
  event.preventDefault();

  const sellingPrice = event.target.Sellingprice.value;
  const productName = event.target.ProductName.value;
  const category = event.target.category.value;

  const product = {
    sellingPrice,
    productName,
    category,
  };

  try {
    const response = await axios.post(link, product);
    displayProduct(response.data);

    // Clear form inputs
    event.target.Sellingprice.value = '';
    event.target.ProductName.value = '';
    event.target.category.value = '';
  } catch (error) {
    console.error(error);
  }
}

// Function to display product data
function displayProduct(product) {
  // Create a new list item
  const newItem = document.createElement('li');
  newItem.textContent = `Name: ${product.productName}, Price: ${product.sellingPrice}, Category: ${product.category}`;

  // Create a delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  // Set a custom data attribute to store the product ID
  deleteButton.dataset.productId = product._id;

  // Add an event listener to the delete button
  deleteButton.addEventListener('click', deleteProduct);

  newItem.appendChild(deleteButton);

  // Append the new item to the product list
  productList.appendChild(newItem);
}

// Function to handle product deletion
async function deleteProduct(event) {
  const productId = event.target.dataset.productId;

  try {
    await axios.delete(`${link}/${productId}`);
    // Remove the deleted product item from the list
    event.target.parentElement.remove();
  } catch (error) {
    console.error(error);
  }
}

// Load initial data when the page is loaded
window.addEventListener('DOMContentLoaded', async () => {
  if (productList.children.length === 0) { // Check if the list is empty
    try {
      const response = await axios.get(link);
      response.data.forEach((product) => {
        // Load initial data here
        displayProduct(product);
      });
    } catch (error) {
      console.error(error);
    }
  }
});

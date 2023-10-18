'use strict';

const form = document.getElementById('productForm');
const link = 'https://crudcrud.com/api/437839843cd3432385419462f6de1ed8/AddProduct';
const productList = document.querySelector('.productList table');

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
  const newRow = document.createElement('tr');
  
  const productNameCell = document.createElement('td');
  productNameCell.textContent = product.productName;
  
  const sellingPriceCell = document.createElement('td');
  sellingPriceCell.textContent = product.sellingPrice;
  
  const deleteButtonCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  
  deleteButton.dataset.productId = product._id;
  deleteButton.addEventListener('click', deleteProduct);
  
  deleteButtonCell.appendChild(deleteButton);
  
  newRow.appendChild(productNameCell);
  newRow.appendChild(sellingPriceCell);
  newRow.appendChild(deleteButtonCell);
  
  const categoryTableId = product.category + 'Table';
  const categoryTable = document.getElementById(categoryTableId);
  
  if (categoryTable) {
    categoryTable.querySelector('table').appendChild(newRow);
  }
}

async function deleteProduct(event) {
  const productId = event.target.dataset.productId;

  try {
    await axios.delete(`${link}/${productId}`);
    event.target.parentElement.parentElement.remove();
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  if (productList.rows.length === 1) {
    try {
      const response = await axios.get(link);
      response.data.forEach((product) => {
        displayProduct(product);
      });
    } catch (error) {
      console.error(error);
    }
  }
});

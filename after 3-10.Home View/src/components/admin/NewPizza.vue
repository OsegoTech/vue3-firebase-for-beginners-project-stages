<template>
  <section class="admin_section">
    <header class="admin_section_header">
      <h3>Add new pizza</h3>
      <form>
        <div class="form_group">
          <label for="name">Name</label>
          <input type="text" id="name" />
        </div>
        <div class="form_group">
          <label for="description">Description</label>
          <textarea rows="5" id="description"></textarea>
        </div>
        <p>
          <strong>Option 1:</strong>
        </p>
        <div class="form_group">
          <label for="size1">Size (")</label>
          <input type="text" id="size1" />
        </div>
        <div class="form_group">
          <label for="price1">Price</label>
          <input type="text" id="price1" />
        </div>
        <p>
          <strong>Option 2:</strong>
        </p>
        <div class="form_group">
          <label for="size2">Size (")</label>
          <input type="text" id="size2" />
        </div>
        <div class="form_group">
          <label for="price2">Price</label>
          <input type="text" id="price2" />
        </div>
        <div class="form_group">
          <button>Add</button>
        </div>
      </form>
    </header>
  </section>
</template>

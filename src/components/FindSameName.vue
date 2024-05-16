<script setup>
</script>

<template>
  <div class="container px-4 text-center">
    <div class="card mt-5">
      <label for="formFile" class="form-label">ФАЙЛ ИСХОДНИК С РАСШИРЕНИЕМ .csv</label>
      <p>должно быть: | Название | Артикул | Цена | Количество |</p>
      <input class="form-control" type="file" id="formFile1" name="file1" accept=".csv" />
      <div id="file1Error" class="invalid-feedback" style="display: none">
        Пожалуйста, выберите файл
      </div>
      <div id="correctFileCSV" style="display: none; color: green">Файл соответствует</div>
      <div id="errorFileCSV" style="display: none; color: red">
        Файл не соответствует, должно быть: | Название | Артикул | Цена | Количество |
      </div>
    </div>

    <div class="card mt-5">
      <label for="formFile" class="form-label">ПРАЙС ПОСТАВЩИКА С РАСШИРЕНИЕМ .xlsx, .xls</label>
      <p>должно быть: |...| Товары (работы, услуги) |...| Товар |...| Сумма |</p>
      <input class="form-control" type="file" id="formFile2" name="file2" accept=".xlsx, .xls" />
      <div id="file2Error" class="invalid-feedback" style="display: none">
        Пожалуйста, выберите файл
      </div>

      <div id="correctFileXLS" style="display: none; color: green">Файл соответствует</div>
      <div id="errorFileXLS" style="display: none; color: red">
        Файл не соответствует, должно быть: |...| Товары (работы, услуги) |...| Товар |...| Сумма |
      </div>
    </div>

    <button
      type="button"
      class="btn btn-outline-primary mt-5"
      id="uploadButton"
      style="display: none"
      onclick="validateAndUpload()"
    >
      <span id="buttonContent">Загрузить и обработать</span>
      <div
        id="loadingSpinner"
        class="spinner-border text-primary"
        role="status"
        style="display: none"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </button>
    <div id="forbiddenAccess" style="display: none; color: red">
      Запрет от сервера. Надо авторизоваться.
    </div>
    <div id="LoginAccess" style="display: none; color: red">
      Чтобы воспользоваться сервисом, надо авторизоваться.
    </div>
    <div id="ServerFail" style="display: none; color: red">Нет ответа от сервера.</div>
  </div>
</template>

<style>
</style>
<script>
import axios from '../axios'
import Papa from 'papaparse'
import { read as XlsxRead, utils as XlsxUtils } from 'xlsx'
//import { RouterLink } from 'vue-router'
export default {
  methods: {
    async findSameNameSubmit() {
      validateAndUpload()
      document.getElementById('buttonContent').style.display = 'none'
      document.getElementById('loadingSpinner').style.display = 'inline-block'
      const file1 = document.querySelector('input[name="file1"]').files[0]
      const file2 = document.querySelector('input[name="file2"]').files[0]
      const formData = new FormData()
      formData.append('file1', file1)
      formData.append('file2', file2)
      const accessToken = localStorage.getItem('accessToken')
      try {
        // в файле axios.js прописали путь localhost... чтоб не писать его много раз
        const responce = await axios.post('resource/service/findSameName', formData, {
          headers: {
            Authorization: 'Bearer ' + accessToken
          },
          responseType: 'arraybuffer'
        })
        changeButton()
        const contentDisposition = responce.headers['content-disposition']
        const fileName = contentDisposition.split('filename="')[1].split('"')[0]
        console.log('fileName {}', fileName)
        const contentType = responce.headers['content-type']
        const blob = new Blob([responce.data], { type: contentType })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        //link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        link.parentNode.removeChild(link)

        //window.open(url, '_blank')
        uploadButton.innerText = 'Выполнено'
      } catch (error) {
        changeButton()
        uploadButton.innerText = 'ОШИБКА'
        if (error.responce) {
          // Request made and server responded with a status code outside the 2xx range
          console.error(`Error response status: ${error.responce.status}`)
          if (error.responce.status === 500) {
            // Server error
            document.getElementById('login-error').style.display = 'block'
            console.error('Server error')
          } else if (responce.status === 403) {
            document.getElementById('forbiddenAccess').style.display = 'block'
            throw new Error('Forbidden access')
          }
        } else if (error.request) {
          console.log(error.request.message)
          // Request made but no response received
          console.error('No response received')
          document.getElementById('ServerFail').style.display = 'block'
        } else {
          // Error setting up the request
          console.error('Error setting up the request')
          document.getElementById('registration-error').style.display = 'block'
        }
      }
    }
  },
  //_______________________________________________________________________________
  mounted() {
    document.addEventListener('DOMContentLoaded', function () {
      document.getElementById('uploadButton').style.display = 'block'
    })
    document.getElementById('formFile1').addEventListener('change', function () {
      const file = this.files[0]
      validateCSVFile(file)
        .then((result) => {
          if (result) {
            document.getElementById('correctFileCSV').style.display = 'block'
          } else {
            document.getElementById('errorFileCSV').style.display = 'block'
          }
        })
        .catch((error) => {
          console.error(error)
        })
    })
    document.getElementById('formFile2').addEventListener('change', function () {
      const file = this.files[0]
      validateExcelFile(file)
        .then((result) => {
          if (result) {
            document.getElementById('correctFileXLS').style.display = 'block'
          } else {
            document.getElementById('errorFileXLS').style.display = 'block'
          }
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }
}
function changeButton() {
  document.getElementById('buttonContent').style.display = 'inline-block'
  document.getElementById('loadingSpinner').style.display = 'none'
}
function validateAndUpload() {
  // Получаем ссылки на поля ввода
  var file1Input = document.getElementById('formFile1')
  var file2Input = document.getElementById('formFile2')
  // Проверяем, были ли выбраны файлы
  if (!file1Input.files[0]) {
    // Если файл не выбран, добавляем классы Bootstrap для подсветки
    file1Input.classList.add('is-invalid')
    // Показываем сообщение об ошибке
    document.getElementById('file1Error').style.display = 'block'
    return // Прекращаем выполнение функции
  } else {
    // Если файл выбран, удаляем классы Bootstrap и скрываем сообщение об ошибке
    file1Input.classList.remove('is-invalid')
    document.getElementById('file1Error').style.display = 'none'
  }
  if (!file2Input.files[0]) {
    file2Input.classList.add('is-invalid')
    document.getElementById('file2Error').style.display = 'block'
    return
  } else {
    file2Input.classList.remove('is-invalid')
    document.getElementById('file2Error').style.display = 'none'
  }
  // Если оба файла выбраны, продолжаем выполнение кода, например, отправляем запрос на сервер
}
function validateCSVFile(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      encoding: 'windows-1251',
      delimiter: ';',
      step: function (result) {
        const targetString = 'Название;Артикул;Цена;Количество'
        const line = result.data.join(';').trim()
        if (line === targetString) {
          resolve(true)
          return false // stop parsing
        }
      },
      complete: function () {
        resolve(false) // resolve with false if the target string is not found
      },
      error: function (err, file, inputElem, reason) {
        console.error(`Error while parsing the file: ${err}`) // log the error
        reject('Error while parsing the file')
      }
    })
  })
}
function validateExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      const workbook = XlsxRead(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const dataArray = XlsxUtils.sheet_to_json(worksheet, {
        header: 1
      })
      const requiredName1 = 'Товары (работы, услуги)'
      const requiredName2 = 'Товар'
      const requiredSum = 'Сумма'
      let nameTrue = false
      for (const row of dataArray) {
        for (const str of row) {
          if (str === requiredName1 || str === requiredName2) {
            //console.log(row)
            nameTrue = true
          }
          if (str === requiredSum && nameTrue) {
            resolve(true)
            return // stop processing
          }
        }
      }
      resolve(false) // false if the target string is not found
    }
    reader.onerror = (error) => {
      reject('Error while reading the file')
    }
    reader.readAsArrayBuffer(file)
  })
}
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

    <form @submit.prevent="findSameNameSubmit">
      <button
        type="submit"
        class="btn btn-outline-primary mt-5"
        id="uploadButton"
        style="display: none"
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
    </form>

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
// create 單數條有藍底色


// 確認 new.hbs input 資料完整，資料型態正確。
const newInputCheck = function () {
  const inputs = document.querySelectorAll('input.obligatory')
  let error = 0
  inputs.forEach(i => {
    if (!i.value) {
      error = 1
    }
  })
  if (error) {
    alert('尚有必要資訊未輸入！')
    event.preventDefault()
  }
}

// 監聽刪除鍵，若被點選跳出 alert
const deleteConfirm = function () {
  if (!confirm('確定刪除本餐廳資料嗎？')) {
    event.preventDefault()
  }
}

const main = document.querySelector('main')
main.addEventListener('click', () => {
  if (event.target.classList.contains('delete')) {
    deleteConfirm()
  }
  if (event.target.classList.contains('create')) {
    newInputCheck()
  }
})

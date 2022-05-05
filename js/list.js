$(function () {

    var jsonData
    function setTable(arr) {
      var htmlStr = template('tb', {
        data: arr
      })
      $("#tb_results > tbody").html(htmlStr)
    }
  
    template.defaults.imports.timeFormat = function (date) {
      var timeArr = date.split('.'),
        sec = timeArr[0] % 60,
        min
      timeArr[0] >= 60 ? min = 1 : min = 0
      sec < 10 ? sec = '0' + sec : null
      return `${min}:${sec}.${timeArr[1]}`
    }
    //获取json数据
    $.ajax({
      url: '../json/list.json',
      async: false,
      success: function (res) {
        //console.log(res);
        jsonData = res
      }
    })
    setTable(jsonData)
  
    $('.mods,.Type').on('change', function () {
      // screen($(this).val())
      screen()
    })
    // 筛选
    function screen() {
      var Type = $('.Type').val(),
        mods = $('.mods').val(),
        arr = jsonData
        //console.log(Type)
  
      if (Type !== 'all') {
        arr = jsonData.filter(function (v) {
          return v.Type == Type
        })
      }
      //console.log(arr)
  
      /*if (mods == 'all') {
        // setTable(jsonData)
      } else if (mods == 0) {
        arr = arr.filter(function (v) {
          return v.mods <= 0
        })
      } else {
        arr = arr.filter(function (v) {
          return v.mods > 0
        })
      }*/
  
      setTable(arr)
    }
  
    //搜索车型
    $('.search').on('input', function () {
      var val = $(this).val().toLowerCase()
      var arr = jsonData.filter(v => {
        return v.BVname.toLowerCase().indexOf(val) != -1
      })
      setTable(arr)
    })
})
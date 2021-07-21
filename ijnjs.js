/// <reference path="../../jsdoc/jquery.js" />
/// <reference path="../../jsdoc/linq.d.ts" />
/// <reference path="SplitStringByRegex.js" />


(function(root,undefined){
  var Enumerable = getEnumerable()

  function getEnumerable(){
    if ( typeof Enumerable === 'undefined' ){
      if ( typeof require === 'function' ){
        return require('linq')
      }
    } 
    return Enumerable
  }
  

  var _isReady = false

  /** @class */
  var Ijnjs = function(){}
  
  Ijnjs.isReady = () => _isReady != false 

  /**
   * 
   * @param {Action} cbDo 
   * @param {FuncBool} cbTest 
   * @param {number} ms 
   */
  Ijnjs.testThenDo = function (cbDo, cbTest, ms){ 
    var ms = ms == undefined ? 33 : ms
    var test = cbTest !== undefined ? cbTest : Ijnjs.isReady

    var fnOnce = once ;    
    once()

    return
    function once(){
      if (test(Ijnjs)){
        cbDo()
      } else {
        setTimeout(() => {
          fnOnce()
        }, ms)
      }
    }
  }

  /**
   * 
   * @param {FuncBool|boolean} cbTest 
   * @param {string?} msg 
   */
  Ijnjs.assert = function (cbTest, msg){
    if (typeof cbTest === 'function'){
      if (false == cbTest()){
        throw Error (getMsg())
      }
    } else if ( typeof cbTest === 'boolean'){
      if ( false == cbTest ) {
        throw Error (getMsg())
      }
    }
    function getMsg () {
      if ( msg != undefined){
        return msg
      }
      if (typeof cbTest === 'function' ){
        return 'assert ' + cbTest.toString()
      }
      return 'assert fail.'
    }
  }

  var csses = [
    'ijn-dialog-base.css',
    'bible-version-dialog-picker.css'
  ]
  loadCss(csses)
  
  var deps = [
    {path:'splitstringbyregex.js', cb: function(re){
      Ijnjs.SplitStringByRegex = re
    }},
    {path:'ijn-dialog-base.js', cb: function(re){
      Ijnjs.DialogBase = re
    }},
    {path:'bible-version-dialog-picker.js', cb: function(re){
      Ijnjs.BibleVersionDialog = re
    }},
  ]
  var ajaxs = loadJsAsync(deps)
  waitThenSetReadyAsync(ajaxs)
 


  
  exportModule()

  return

  function exportModule(){
    if (typeof define === 'function' && define.amd ){
      console.log(97)
      define('Ijnjs', [], function(){ return Ijnjs })
    } else if ( typeof module !== 'undefined' && module.exports ){
      console.log(100)
      module.exports = Ijnjs
    } else {
      console.log(103)
      root.Ijnjs = Ijnjs
    }
  }

  /**
   * 
   * @param {{path:string,cb:Action1}[]} deps 
   */
  function loadJsAsync(deps){
    var srd = '/static/ijnjs/'
    return Enumerable.from(deps).select(a1=>{
      return new Promise(function(res,rej){
        $.ajax({
          url: srd + a1.path,
          dataType: 'text',    
          success: function(strCode){
            execAsync( result =>{
              a1.cb( result )
              res()
            })
            return // success return 
            
            /**
             * @param {Action1} cbResultReady 
             */
            function execAsync(cbResultReady){
              var re = {}
              var fn = function(){ eval(strCode) }
              fn.call(re)
  
              // 有些會是 async 才設定 
              // 因為在等待其它先好, 例如 bible-version-dialog-picker 就要先等 ijn-dialog-base
              Ijnjs.testThenDo( () => {
                  var re2 = re[Object.keys(re)[0]]
                  cbResultReady(re2)
                },js => {
                  return Object.keys(re).length !== 0
                }
              )
            }
          }})
        })
        
      }).toArray()
  }
  /**
   * 
   * @param {string[]} csses 例 'ijn-dialog-base.css' 相對於這個 /static/ijnjs/ 這個位置
   */
  function loadCss(csses){
    var srd = '/static/ijnjs/'
    Enumerable.from(csses).forEach(a1=>{
      $('<link/>',{
        rel: 'stylesheet',
        type: 'text/css',
        href:  srd + a1
      }).appendTo('head')
    })
  }
  function waitThenSetReadyAsync(ajaxs){
    Promise.all(ajaxs).then(()=>{
      chk()
      _isReady = true
      return 
      function chk(){
        var r1 = Enumerable.from(Object.keys(Ijnjs))
        var r2 = Enumerable.from(['SplitStringByRegex','DialogBase','BibleVersionDialog'])
          .all(a1=> r1.contains(a1))
        Ijnjs.assert( r2 )
      }
    })
  }
})(this)


  /**
   * This callback is when dialog closed be called
   * @callback FuncBool
   * @param {Ijnjs} a1
   * @returns {boolean}
   */

  /**
   * This callback is when dialog closed be called
   * @callback Action
   */

  /**
   * This callback is when dialog closed be called
   * @callback Action1
   * @param {any} a1
   */

  /**
   * This callback is when dialog closed be called
   * @callback Action2
   * @param {any} a1
   * @param {any} a2
   */

  /**
   * This callback is when dialog closed be called
   * @callback Action3
   * @param {any} a1
   * @param {any} a2
   * @param {any} a3
   */
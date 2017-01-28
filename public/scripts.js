$(document).ready( function(){

  var input  = $('input[name="url"]')
  var result = $('#link')
  var resultSection = $('#result-section')
  var submitBtn = $('#submit')

  function displayResult(response) {
    result.html(response.data.short)
    result.attr('href', response.data.short)
    input.val('')
    resultSection.css('display', '')
  }

  submitBtn.click( function(e){
    e.preventDefault()

    var inputUrl = input.val()

    if(inputUrl == null){
      alert('Are you sure the URL is correct? Make sure it has http:// or https:// at the beginning')
      return
    }

    axios.post('/create', { url: inputUrl })
      .then(displayResult)
      .catch(function(error) {
        alert('Are you sure the URL is correct? Make sure it has http:// or https:// at the beginning')
      })
  })

})

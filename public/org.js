var allTheData = document.querySelector('.commaSeparated').textContent.trim().split(',')
var separateList = '<ul>'
allTheData.forEach(function(value) {
   separateList += '<li>' + value + '</li>';
});
separateList += '</ul>';
document.querySelector(".commaSeparated").innerHTML = separateList;
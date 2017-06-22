var csv = require("fast-csv");

var headers = {headers: ["PRODUTOS", "UNID", "BAHAMAS", "BRETAS", "PAIS E FILHOS", "MART MINAS", "FORTALEZA", "CARREFOUR", "VILLEFORT", "REI DO ARROZ", "VARIAÇÃO (%)", "MIN", "MAX"]}

var rowCount = 0;
var productCount = 0;

var PRODUCT_NAME_COL = 0;
var UNITY_COL = 1;
var FIRST_MARKET_COL = 2;
var PRICE_VARIATION_COL = 10;


csv
  .fromPath("080617.csv")
	.on("data", function (data) {

    processRow(data);

    rowCount++;

    //console.log(data);
})
.on("end", function () {
	console.log("done", productCount);
});



function processRow (row) {

  if (rowCount === 0) {
    console.log("first row", row);
    findPriceVariationColumn(row);
    getMarketNames(row);

  } else if (parseInt(row[PRODUCT_NAME_COL].substring(0, 1)) > 0) {
    console.log("categoria", row[PRODUCT_NAME_COL]);

    //console.log(parseInt(row[PRODUCT_NAME_COL].substring(0, 1)));

  }


}


function findPriceVariationColumn (row) {

  for(var i = 0; i < row.length; i++) {
    if (row[i].indexOf('%') > 0) {
      console.log('coluna variação: ', row[i]);
      PRICE_VARIATION_COL = i;
    }
  }

}



function getMarketNames(row) {
  var markets = [];

  for (var i = FIRST_MARKET_COL; i < PRICE_VARIATION_COL; i++) {
    markets.push(row[i]);
  }
  
  console.log('markets: ', markets);


}





function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}







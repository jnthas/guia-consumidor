var csv = require("fast-csv");
var numeral = require("numeral");
var fs = require('fs');


numeral.register('locale', 'br', {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
  abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't'
  },
  ordinal : function (number) {
      return number === 1 ? 'real' : 'reais';
  },
  currency: {
      symbol: 'R$'
  }
});
numeral.locale('br');


var rowCount = 0;
var productCount = 0;

var PRODUCT_NAME_COL = 0;
var UNITY_COL = 1;
var FIRST_MARKET_COL = 2;
var PRICE_VARIATION_COL = 10;


var guiaConsumidor = {
  data: new Date(),
  mercados: [],
  produtos: []
};
var products = [];
var category = null;





csv
  .fromPath("080617.csv")
	.on("data", function (data) {

    processRow(data);

    rowCount++;

    //console.log(data);
})
.on("end", function () {

  guiaConsumidor.produtos = products;

  console.dir(guiaConsumidor,{depth: null});
	console.log("done", productCount);

  fs.writeFile("080617.json", JSON.stringify(guiaConsumidor), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
  }); 


});



function processRow (row) {

  if (rowCount === 0) {
    //console.log("first row", row);
    findPriceVariationColumn(row);
    getMarketNames(row);

  } else if (parseInt(row[PRODUCT_NAME_COL].substring(0, 1)) > 0) {
    //console.log("categoria", row[PRODUCT_NAME_COL]);
    

    var cat = row[PRODUCT_NAME_COL];


    category = capitalizeFirstLetter(cat.substring(cat.indexOf('-') + 1, cat.length).trim());

    //console.log(parseInt(row[PRODUCT_NAME_COL].substring(0, 1)));

  } else {


    var prod = row.slice(FIRST_MARKET_COL, PRICE_VARIATION_COL);
    prod = prod.map(function (e) {
      var n = numeral(e);
      return n.value();

    });


    products.push({
      nome: row[PRODUCT_NAME_COL],
      categoria: category,
      unidade: row[UNITY_COL].toLowerCase(),
      variacao: numeral(row[PRICE_VARIATION_COL]).value(),
      precos: prod
    });


    
    //console.log(prod);

  }


}


function findPriceVariationColumn (row) {

  for(var i = 0; i < row.length; i++) {
    if (row[i].indexOf('%') > 0) {
      //console.log('coluna variação: ', row[i]);
      PRICE_VARIATION_COL = i;
    }
  }

}



function getMarketNames(row) {
  var markets = [];

  for (var i = FIRST_MARKET_COL; i < PRICE_VARIATION_COL; i++) {
    markets.push(row[i]);
  }
  
  //console.log('markets: ', markets);

  guiaConsumidor.mercados = markets;


}





function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}







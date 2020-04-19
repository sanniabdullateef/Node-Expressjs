const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadService');

const parser = xml2js.Parser({ explicitArray: false})

function goodreadServerice() {
    function getBookById (id){
      return new Promise ((resolve, reject) => {
          axios.get(`https://www.goodreads.com/author/list/${id}?format=xml&key=ZU5sUaRxDxGrktSaRtcA`)
          .then((response) =>{
            parser.parseString(response.data, (err, result) => {
             if (err){
                 debug(err);
             } else {
                 debug(result)
                 resolve(result.GoodreadsResponse.book)
             }
            })
          })
          .catch((error) => {
              reject(error)
              debug(error)
          })
          resolve({ description: 'Our description'});
      });
    }
    return {getBookById}
}

module.exports = goodreadServerice ();

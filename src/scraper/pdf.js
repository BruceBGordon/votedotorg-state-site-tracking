const fs 		= require('fs');
const pdf 		= require('pdf-parse');
const path 		= require('path');
const axios 	= require('axios');
const mongo 	= require('mongodb');
const crypto 	= require('crypto');

async function retrieveAndComparePDF(pdfToCompare) 
{
	var oldPDFHash   = pdfToCompare.hash
	let remotePDFURL = pdfToCompare.url

	//Request the new PDF via axios
	axios(
	{
  		url: remotePDFURL,
  		responseType: 'arraybuffer' //arraybuffer to get translated by the pdf-parse library
	})
  	.then(function (response)
  	{
      	//Get PDF information
		pdf(response.data).then(function(data) 
		{
			//Hash the new pdf body text
		    var newPDFHash = crypto.createHash('md5').update(data.text).digest('hex')

		    console.log("Old hash: " + oldPDFHash)
		    console.log("New hash: " + newPDFHash)

		    //Compare the new hash against the previous hash
		    //Hashes are the same
		    if (newPDFHash === oldPDFHash)
		    {
				console.log("Hashes match")
				//Do nothing, hashes are the same, we are done here.
		    }
		    //Hashes aren't the same
		    else
		    {
				console.log("Hashes do not match")
		    	//TODO: Insert the hash, etc. combination into database
				//TODO: Send notifications that hashes do not match
		    }
		})
  	})
}

//TODO: Pull out the list of pdf/hash, etc. from database

let pdfsToCompare = [{"hash":"262c87980f945f17d850e55439539499","url":"https://github.com/BruceBGordon/votedotorg-state-site-tracking/raw/Will-Scraping/src/scraper/remotePDF.pdf"},
					{"hash":"0761019b03c4a4e3de6fe2c398f0a2fc","url":"https://github.com/BruceBGordon/votedotorg-state-site-tracking/raw/Will-Scraping/src/scraper/remotePDF.pdf"}]

//Loop through each PDF to compare against the latest version
for (var i = 0; i < pdfsToCompare.length; ++i)
{
	let pdfToCompare = pdfsToCompare[i]
	retrieveAndComparePDF(pdfToCompare)
}
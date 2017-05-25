function getSequence(){

            var geneSymbol = document.getElementById("geneSymbol").value;
            var geneSymbol = geneSymbol.trim().replace(/[^a-z0-9]/gi, "");
            if(geneSymbol != ""){
                console.log(geneSymbol);
            }else{
                document.getElementById("invalidInput").style.display='block';
            }            

            var idAPI = `https://rest.ensembl.org/xrefs/symbol/homo_sapiens/${geneSymbol}?content-type=application/json`
            fetch(idAPI) // Call the fetch function passing the url of the API as a parameter
                .then((resp) => resp.json())
                .then(function(data) {
                    var ensemblID = data[0].id;
                    var sequenceAPI = `https://rest.ensembl.org/sequence/id/${ensemblID}?content-type=text/plain`
                      fetch(sequenceAPI) // Call the fetch function passing the url of the API as a parameter
                      .then((resp) => resp.text())
                        .then(function(data) {
                            document.getElementById("geneSequence").innerText=data;
                        })
                        .catch(function(err) {
                           console.log(err.message);
                    });
                })
                .catch(function(err) {
                    console.log(err.message);
                });
            };
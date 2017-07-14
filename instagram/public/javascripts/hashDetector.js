
var someString = "Vive trankilo #CogeloSuave    #Nolepareanada #klkconklk"

function commentString(someString){
    console.log(someString.split(/\s+/).map(function(token) {
        if (token.slice(0, 1) === '#')
            return(token.slice(1, token.length))
    }).filter(function(token) {
        return(token)
    }));   
}
commentString(someString);
let express = require('express');
let routes = require('./routes');
let path = require('path');

let books = require('./routes/books');
//load customers route
const app = express();
let connection  = require('express-myconnection');
let mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4567);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(

    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : '1',
        database:'CRUDBook'
    })

);

app.get('/', routes.index);
app.get('/books',books.list);
app.get('/books/delete/:id',books.delete);
app.get('/books/add',books.movepageadd);
app.post('/books/addbooks',books.add);
app.get('/books/edit/:id',books.movepageedit);
app.post('/books/editbooks/:id',books.edit);




app.use(app.router);


app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

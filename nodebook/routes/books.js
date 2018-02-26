exports.list = function(req, res){

    req.getConnection(function(err,connection){

        let query = connection.query('select * from book',function(err,rows)
        {

            if(err) throw err('error select * from book');

            res.render('books',{title:"Table books",data:rows});
            console.log(JSON.stringify(rows));

        });
        console.log(query.sql);
    });
};
exports.delete = function(req,res){

    let id = req.params.id;

    req.getConnection(function (err, connection) {

        connection.query("delete from book  where id = ? ",[id], function(err)
        {

            if(err) throw err('delete error');
            res.redirect('/books');

        });

    });
};
exports.movepageadd = function (req, res){
    res.render('addBook',{title: 'addBook'});
};
exports.add = function (req, res){
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        let data = {
            title       : input.inputTitle,
            author      : input.inputAuthor,
            publisher   : input.inputPublisher,
            price       : input.inputPrice
        };
        let query = connection.query("insert into book set ? ",data, function(err) {

            if (err) throw err;
            res.redirect('/books');
        });
        console.log(query.sql);
    });
};
exports.movepageedit = function (req, res){
    let id = req.params.id;

    req.getConnection(function(err,connection){

        connection.query('SELECT * FROM book WHERE id = ?',[id],function(err,rows)
        {

            if (err) throw err ('move page where id : %s', id);

            res.render('editBook',{title: 'editBook', data : rows});
        });
    });
};
exports.edit = function(req,res){
    let input = JSON.parse(JSON.stringify(req.body));
    let id = req.params.id;
    req.getConnection(function (err, connection) {
        let data = {
            title       : input.inputTitle,
            author      : input.inputAuthor,
            publisher   : input.inputPublisher,
            price       : input.inputPrice
        };
        connection.query("UPDATE book set ? WHERE id = ? ",[data,id], function(err)
        {
            if (err) throw err;
            res.redirect('/books');
        });
    });
};
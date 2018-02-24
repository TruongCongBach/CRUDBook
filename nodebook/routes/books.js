exports.list = function(req, res){

    req.getConnection(function(err,connection){

        let query = connection.query('SELECT * FROM book',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('books',{title:"Table books",data:rows});


        });

        console.log(query.sql);
    });

};
exports.delete = function(req,res){

    let id = req.params.id;

    req.getConnection(function (err, connection) {

        let query=connection.query("DELETE FROM book  WHERE id = ? ",[id], function(err)
        {

            if(err)
                console.log("Error deleting : %s ",err );

            res.redirect('/books');
            console.log(query);
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
            publishor   : input.inputPublisher,
            price       : input.inputPrice
        };
        let query = connection.query("INSERT INTO book set ? ",data, function(err) {

            if (err)
                console.log("Error inserting : %s ",err );
            res.redirect('/books');
        });
        console.log(query.sql);
    });
};
exports.movepageedit = function (req, res){
    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM book WHERE id = ?',[id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('editBook',{title: 'editBook', data : rows});


        });
            console.log(query);

    });
};
exports.edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            title       : input.inputTitle,
            author      : input.inputAuthor,
            publisher   : input.inputPublisher,
            price       : input.inputPrice

        };

         connection.query("UPDATE book set ? WHERE id = ? ",[data,id], function(err, rows)
        {

            if (err)
                console.log("Error Updating : %s ",err );

            res.redirect('/books');

        });

    });
};
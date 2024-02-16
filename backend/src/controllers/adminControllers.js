const Book = require("../model/bookModel");

const Addbook = async(req,res)=>{
   try {
    let obj = { 
        bookName: req.body.bookname, 
        img: req.body.bookimg, 
        sellingprice: req.body.booksellingprice, 
        costprice: req.body.bookcostprice,  
        bookcat_img : req.body.bookcategoryimg, 
        writerName: req.body.bookwriter, 
        booktype_img : req.body.booktypeimg,
        publishyear: req.body.publishyear,
        booktypename: req.body.booktype,
        category: req.body.bookcategories,
        booksummary: req.body.summary
    }
    let newbook = await Book.create(obj);
    if(newbook){
        console.log("Inserted successfully")
        res.status(200).json({message: "Inserted"})
    }
    else{
        console.log("Not Inserted")
        res.status(400).json({message: "Not Inserted"})
    }
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
   }
}
const Detail = (req,res) => {
    var username = req.body.username;
    var password  = req.body.password;
    console.log(`Username: ${username}, Password: ${password}`)
}
const Booklist = async(req,res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const Bookdesc = async(req,res) => {
  const bookId = req.params.book_id;
  try {
    const book = await Book.findOne({
      where: {
        id: bookId,
      },
    });

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = { Addbook, Detail, Booklist, Bookdesc } 
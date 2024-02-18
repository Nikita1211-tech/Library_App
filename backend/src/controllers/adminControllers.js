const Book = require("../model/bookModel");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename
    }
});
const filefilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      cb(null,true)
    }
    else{
      cb(null,false)
    }
}
// const fileSizeLimit = 1024 * 1024 * 10;
// const Upload =  multer({ storage: storage,
//   limits: {
//     fileSize: fileSizeLimit
// }
// });
const upload = multer({
   storage: storage,
   limits:{
      fileSize: 1024*1024*5
   },
   filefilter: filefilter
})
const AddBook = async (req, res) => {
  try {
    console.log(req.file)
    const obj = { 
      bookName: req.body.bookname, 
      img: req.file.path, 
      sellingprice: req.body.booksellingprice, 
      costprice: req.body.bookcostprice,  
      bookcat_img : req.file.path, 
      writerName: req.body.bookwriter, 
      booktype_img : req.file.path,
      publishyear: req.body.publishyear,
      booktypename: req.body.booktype,
      category: req.body.bookcategories,
      booksummary: req.body.summary
    };
    // const bookimg = req.file.path; // Assuming the image path is saved in 'uploads/'

    const newBook = await Book.create(obj);
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  // try {
  //   let imgPath = ''; // Initialize imgPath variable
  //   // Check if req.file exists before accessing its properties
  //   if (req.body && req.body.bookimg) {
  //     imgPath = req.body.bookimg; // Get the path of the uploaded file
  //   } else {
      
  //     console.log(imgPath)
  //     console.log(req.body)
  //     // console.log(req)
  //     // Handle case where req.file is undefined or missing
  //     console.error('No file uploaded');
  //     // Optionally, you can return an error response to the client
  //     return res.status(400).json({ error: 'No file uploaded' });
  //   }
  //   const obj = { 
  //     bookName: req.body.bookname, 
  //     img: req.body.bookimg, 
  //     sellingprice: req.body.booksellingprice, 
  //     costprice: req.body.bookcostprice,  
  //     bookcat_img : req.body.bookcategoryimg, 
  //     writerName: req.body.bookwriter, 
  //     booktype_img : req.body.booktypeimg,
  //     publishyear: req.body.publishyear,
  //     booktypename: req.body.booktype,
  //     category: req.body.bookcategories,
  //     booksummary: req.body.summary
  //   };
  //   console.log(obj)
  //   let newbook = await Book.create(obj);
  //   if(newbook){
  //     console.log("Inserted successfully")
  //     res.status(200).json({message: "Inserted"})
  //   }
  //   else
  //   {
  //     console.log("Not Inserted")
  //     res.status(400).json({message: "Not Inserted"})
  //   }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Internal server error' });
  // }
};

// const Addbook = async(req,res)=>{
//    try {
//     let obj = { 
//         bookName: req.body.bookname, 
//         img: req.body.bookimg, 
//         sellingprice: req.body.booksellingprice, 
//         costprice: req.body.bookcostprice,  
//         bookcat_img : req.body.bookcategoryimg, 
//         writerName: req.body.bookwriter, 
//         booktype_img : req.body.booktypeimg,
//         publishyear: req.body.publishyear,
//         booktypename: req.body.booktype,
//         category: req.body.bookcategories,
//         booksummary: req.body.summary
//     }
//     let newbook = await Book.create(obj);
//     if(newbook){
//         console.log("Inserted successfully")
//         res.status(200).json({message: "Inserted"})
//     }
//     else{
//         console.log("Not Inserted")
//         res.status(400).json({message: "Not Inserted"})
//     }
//    } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//    }
// }
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
const Updatebook = async(req, res)=>{
  try {
    const bookId = req.params.book_id;
    console.log(bookId)
    const book = await Book.findByPk(bookId);
    const obj = { 
      bookName: req.body.bookname, 
      img: req.body.img, 
      sellingprice: req.body.booksellingprice, 
      costprice: req.body.bookcostprice,  
      bookcat_img : req.body.bookcategoryimg, 
      writerName: req.body.bookwriter, 
      booktype_img : req.body.booktypeimg,
      publishyear: req.body.publishyear,
      booktypename: req.body.booktype,
      category: req.body.bookcategories,
      booksummary: req.body.summary
    };
    if (book) {
      console.log(obj)
      const updatebook = await book.update(obj);
      if(updatebook){
        console.log("Updated")
      }
      else{
        console.log("Not updated")
      }
      return res.status(200).json({ message: 'Book updated successfully', book });
    }
    else return res.status(404).json({ error: 'Book not found' });

} catch (error) {
    console.error('Failed to update book:', error);
    return res.status(500).json({ error: 'Failed to update book' });
}
}

const Deletebook = async (req, res) => {
  const bookId = req.params.book_id;

  try {
    // Find the book by ID
    const book = await Book.findByPk(bookId);

    // If the book doesn't exist, return a 404 Not Found response
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Delete the book
    else {
      await book.destroy();

    // Return a success response
      return res.status(200).json({ message: 'Book deleted successfully' });
    }
  } catch (error) {
    // If an error occurs, return a 500 Internal Server Error response
    console.error('Failed to delete book:', error);
    return res.status(500).json({ error: 'Failed to delete book' });
  }
};

module.exports = { AddBook,Detail, upload, Booklist, Bookdesc, Updatebook, Deletebook } 
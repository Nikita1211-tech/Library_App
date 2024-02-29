// const { SELECT } = require("sequelize/types/query-types");
const { Sequelize } = require("sequelize");
const Book = require("../model/bookModel");
const BookCategory = require("../model/bookCategoryModel")
const Booktype = require("../model/bookType.model");
const multer = require('multer');
// const Booktype = require("../model/bookType.model");
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
    console.log(req.files)
    const obj = {
      bookName: req.body.bookname,
      sellingprice: req.body.booksellingprice,
      costprice: req.body.bookcostprice,
      writerName: req.body.bookwriter,
      publishyear: req.body.publishyear,
      booktypename: req.body.booktype,
      category: req.body.bookcategories,
      booksummary: req.body.summary
    };
    if (req.files) {
      // Assuming req.files contains uploaded files for both fields
      if (req.files['bookimg'] && req.files['bookimg'].length > 0) {
        obj.img = req.files['bookimg'][0].path;
      }
      if (req.files['bookcategoryimg'] && req.files['bookcategoryimg'].length > 0) {
        obj.bookcat_img = req.files['bookcategoryimg'][0].path;
      }
      if (req.files['booktypeimg'] && req.files['booktypeimg'].length > 0) {
        obj.booktype_img = req.files['booktypeimg'][0].path;
      }
    }
    // const bookimg = req.file.path; // Assuming the image path is saved in 'uploads/'

    const newBook = await Book.create(obj);
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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
    const books = await Book.findAll({
      attributes: [
        [Sequelize.fn("MAX", Sequelize.col("id")), "id"],
        "category","bookcat_img", "booktypename","booktype_img",
      ],
      group: ["category", "booktypename"],
    });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
// const Booktypelist = async(req,res) => {
//   try {
//     const books = await Book.findAll({
//       attributes: [
//         [Sequelize.fn("MAX", Sequelize.col("id")), "id"],
//         "booktypename","booktype_img",
//       ],
//       group: ["booktypename"],
//     });
//     res.json(books);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }
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
    console.log(req.body)
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
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    else {
      await book.destroy();

      return res.status(200).json({ message: 'Book deleted successfully' });
    }
  } catch (error) {
    console.error('Failed to delete book:', error);
    return res.status(500).json({ error: 'Failed to delete book' });
  }
}

const Bookcategory = async (req, res) => {
  const bookcategory = req.body.bookcategory;

  try {
    const books = await Book.findAll({ where: { category: bookcategory } }); // Using findAll to get multiple books
    console.log(books);
    
    if (books.length > 0) {
      res.json(books); 
    } else {
      return res.status(404).json({ Message: "Book category not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to load books' });
  }
}

const Addbookcategory = async (req, res) => {
  const obj = {
    category: req.body.category 
  }
  console.log(obj.category)
  try {
    const existingcategory = await BookCategory.findOne({ where: { category: obj.category } });
    if (existingcategory != null) {
      return res.status(409).json({ message: "Book category already exists" });
    }
    const newBook = await BookCategory.create(obj);
    return res.status(201).json({ message: "Book category added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const Showbookcategory = async (req,res) => {
  try {
    const Bookcategory = await BookCategory.findAll();
    return res.status(201).json(Bookcategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const Addbooktype = async (req, res) => {
  const obj = {
    type: req.body.type 
  }
  console.log(obj.type)
  try {
    const existingtype = await Booktype.findOne({ where: { type: obj.type } });
    if (existingtype != null) {
      return res.status(409).json({ message: "Book type already exists" });
    }
    const newBook = await Booktype.create(obj);
    return res.status(201).json({ message: "Book type added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const Showbooktype = async (req,res) => {
  try {
    const type = await Booktype.findAll();
    return res.status(201).json(type);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { AddBook, Detail, upload, Booklist, Bookdesc, Updatebook, Deletebook, Bookcategory, Addbookcategory, Showbookcategory, Addbooktype, Showbooktype } 
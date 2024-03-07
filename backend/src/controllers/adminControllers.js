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
    // console.log(req.file)
    if (req.file) {
      const obj = {
        bookName: req.body.bookname,
        sellingprice: req.body.booksellingprice,
        costprice: req.body.bookcostprice,
        writerName: req.body.bookwriter,
        publishyear: req.body.publishyear,
        booktypename: req.body.booktype,
        bookcat_img: req.body.bookcategoryimg,
        booktype_img: req.body.booktypeimg,
        category: req.body.bookcategories,
        booksummary: req.body.summary,
        img: req.file.path 
      };
      console.log(obj)
      const existingBook = await Book.findOne({where: {  bookName: bookName}});
      const newBook = await Book.create(obj);
      if(newBook){
         return res.status(200).json({ message: 'Book added successfully' })
      }
      res.status(201).json(newBook);
    }
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
const Books = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const Booklist = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: [
        [Sequelize.fn("MAX", Sequelize.col("id")), "id"],
        "category",
        "bookcat_img",
        "booktypename",
        "booktype_img",
      ],
      group: ["category"], // Group by both category and booktypename
    });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

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
// const Updatebook = async(req, res)=>{
//   const bookId = req.params.book_id;
//   console.log(bookId)
//   const book = await Book.findByPk(bookId);
//   console.log(req.body)
//   try {
//     const obj = { 
//       bookName: req.body.bookname, 
//       img: req.file.path, 
//       sellingprice: req.body.booksellingprice, 
//       costprice: req.body.bookcostprice,  
//       bookcat_img : req.body.bookcategoryimg, 
//       writerName: req.body.bookwriter, 
//       booktype_img : req.body.booktypeimg,
//       publishyear: req.body.publishyear,
//       booktypename: req.body.booktype,
//       category: req.body.bookcategories,
//       booksummary: req.body.summary
//     };
//     if (book) {
//       console.log(obj)
//       const updatebook = await book.update(obj);
//       if(updatebook){
//         console.log("Updated")
//         return res.status(200).json({ message: 'Book updated successfully', book });
//       }
//       else{
//         console.log("Not updated")
//       }
//     }
//     else return res.status(404).json({ error: 'Book not found' });

// } catch (error) {
//     console.error('Failed to update book:', error);
//     return res.status(500).json({ error: 'Failed to update book' });
// }
// }

const Updatebook = async(req,res) => {
  console.log(req.file)
  const bookid = req.params.book_id;
  const obj = { 
    bookName: req.body.bookname, 
    img: req.file.path, 
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
  try {
    const book = await Book.findByPk(bookid);
    if (!book) {
      return res.status(404).json({ error: 'Category not found' });
    }
    book.bookName = req.body.bookname, 
    book.img = req.file.path, 
    book.sellingprice = req.body.booksellingprice, 
    book.costprice = req.body.bookcostprice,  
    book.bookcat_img = req.body.bookcategoryimg, 
    book.writerName = req.body.bookwriter, 
    book.booktype_img = req.body.booktypeimg,
    book.publishyear = req.body.publishyear,
    book.booktypename = req.body.booktype,
    book.category = req.body.bookcategories,
    book.booksummary = req.body.summary
    console.log(book)
    
    await book.save();
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
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

const Bookcategorydesc = async(req,res) => {
  const bookId = req.params.book_id;
  try {
    const bookcategory = await BookCategory.findOne({
      where: {
        id: bookId,
      },
    });

    if (bookcategory) {
      res.json(bookcategory);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const Booktypedesc = async(req,res) => {
  const bookId = req.params.book_id;
  try {
    const booktype = await Booktype.findOne({
      where: {
        id: bookId,
      },
    });

    if (booktype) {
      res.json(booktype);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const Booktypes = async (req, res) => {
  const booktype = req.body.booktype;

  try {
    const books = await Book.findAll({ where: { booktypename: booktype } }); // Using findAll to get multiple books
    console.log(books);
    
    if (books.length > 0) {
      res.json(books); 
    } else {
      return res.status(404).json({ Message: "Book type not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to load books' });
  }
}

// const Addbookcategory = async (req, res) => {
//   const obj = {
//     category: req.body.category 
//   }
//   console.log(obj)
//   try {
//     const existingcategory = await BookCategory.findOne({ where: { category: obj.category } });
//     if (existingcategory != null) {
//       return res.status(409).json({ message: "Book category already exists" });
//     }
//     const newBook = await BookCategory.create(obj);
//     return res.status(201).json({ message: "Book category added successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }

const Addbookcategory = async (req, res) => {
  try {
    const category = req.body.category;
    if (!category) {
      return res.status(400).json({ message: "Category name not provided" });
    }

    // Check if category already exists
    const existingCategory = await BookCategory.findOne({ where: { category: category } });
    if (existingCategory) {
      return res.status(409).json({ message: "Book category already exists" });
    }

    // Save the uploaded image
    const imagePath = req.file ? req.file.path : null;
    if (!imagePath) {
      return res.status(400).json({ message: "Image not provided" });
    }

    // Save the category details to the database
    const newCategory = await BookCategory.create({ category: category, image: imagePath });
    return res.status(201).json({ message: "Book category added successfully", category: newCategory });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const Showbookcategory = async (req,res) => {
  try {
    const Bookcategory = await BookCategory.findAll();
    console.log(BookCategory)
    return res.status(201).json(Bookcategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// <<<<<<< HEAD
const Showcategoryimage = async (req,res) => {
  try {
    const categoryName = req.params.categoryName;
    
    const category = await BookCategory.findOne({ where: { category: categoryName }, attributes: ['image'] });

    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    // Return the image URL of the category
    return res.status(200).json({ image: category.image });
} catch (error) {
    return res.status(500).json({ message: error.message });
}
}
const Showtypeimage = async (req,res) => {
  try {
    const typeName = req.params.typeName;
    
    const type = await Booktype.findOne({ where: { type: typeName }, attributes: ['image'] });

    if (!type) {
        return res.status(404).json({ error: 'Type not found' });
    }

    // Return the image URL of the category
    return res.status(200).json({ image: type.image });
} catch (error) {
    return res.status(500).json({ message: error.message });
}
}

// const Updatebookcategory = async(req,res) => {
//   console.log(req?.file)
//   const categoryid = req.params.id;
//   const categoryname = req.body.category;
//   const image = req?.file?.path;
//   try {
//     const category = await BookCategory.findByPk(categoryid);
//     if (!category) {
//       return res.status(404).json({ error: 'Category not found' });
//     }
//     category.category = categoryname;
//     if(image){

//       category.image = image;
//     }

//     await category.save();
//     console.log(category)
//     res.status(200).json({ message: 'Category updated successfully' });
//   } catch (error) {
//     console.error('Error updating category:', error);
//     res.status(500).json({ error: 'Failed to update category' });
//   }
// }

const Updatebookcategory = async (req, res) => {
  try {
    console.log(req?.file);
    const categoryid = req.params.id;
    const categoryname = req.body.category;
    const image = req?.file?.path;
    const category = await BookCategory.findByPk(categoryid);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
// <<<<<<< HEAD
    }

    // If User Exist
    if (categoryname) {
      const existingCategory = await BookCategory.findOne({ where: { category: categoryname } });
      if (existingCategory && existingCategory.id !== categoryid) {
        return res.status(400).json({ message: 'Category name already exists' });
      }
      // Update category name
    }
    category.category = categoryname;
    if(image){
      category.image = image;
    }
    await category.save();
    console.log(category)
    res.status(200).json({ message: 'Category updated successfully' });
// >>>>>>> 5ba9bc53eacad7098ba50c9f883126c50829dbbb
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
};


const Updatebooktype = async(req,res) => {
  // console.log(req?.file)
  try {
    console.log(req?.file);
    const typeid = req.params.id;
    const typename = req.body.type;
    const image = req?.file?.path;
    const type = await Booktype.findByPk(typeid);
    if (!type) {
      return res.status(404).json({ message: 'Type not found' });
// <<<<<<< HEAD
    }

    // If User Exist
    if (typename) {
      const existingType = await Booktype.findOne({ where: { type: typename } });
      if (existingType && existingType.id !== typeid) {
        return res.status(400).json({ message: 'Type name already exists' });
      }
      // Update category name
    }
    type.type = typename;
    if(image){
      type.image = image;
    }
    await type.save();
    console.log(type)
    res.status(200).json({ message: 'Type name updated successfully' });
// >>>>>>> 5ba9bc53eacad7098ba50c9f883126c50829dbbb
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
}

const Deletebookcategory = async (req, res) => {
  const bookId = req.params.book_id;

  try {
    const category = await BookCategory.findByPk(bookId);

    if (!category) {
      return res.status(404).json({ error: 'Book Category not found' });
    }

    else {
      await category.destroy();

      return res.status(200).json({ message: 'Book Category deleted successfully' });
    }
  } catch (error) {
    console.error('Failed to delete book:', error);
    return res.status(500).json({ error: 'Failed to delete book' });
  }
}

// const Addbooktype = async (req, res) => {
//   const obj = {
//     type: req.body.type 
//   }
//   console.log(obj.type)
//   try {
//     const existingtype = await Booktype.findOne({ where: { type: obj.type } });
//     if (existingtype != null) {
//       return res.status(409).json({ message: "Book type already exists" });
//     }
//     const newBook = await Booktype.create(obj);
//     return res.status(201).json({ message: "Book type added successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }

const Addbooktype = async (req, res) => {
  try {
    const type = req.body.type;
    if (!type) {
      return res.status(400).json({ message: "Type name not provided" });
    }

    // Check if type already exists
    const existingType = await Booktype.findOne({ where: { type: type } });
    if (existingType) {
      return res.status(409).json({ message: "Book type already exists" });
    }

    // Save the uploaded image path
    const imagePath = req.file ? req.file.path : null;
    if (!imagePath) {
      return res.status(400).json({ message: "Image not provided" });
    }

    // Save the type details to the database
    const newType = await Booktype.create({ type: type, image: imagePath });
    return res.status(201).json({ message: "Book type added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const Showbooktype = async (req,res) => {
  try {
    const type = await Booktype.findAll();
    return res.status(201).json(type);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const Deletebooktype = async (req, res) => {
  const bookId = req.params.book_id;

  try {
    const type = await Booktype.findByPk(bookId);

    if (!type) {
      return res.status(404).json({ error: 'Book Type not found' });
    }

    else {
      await type.destroy();

      return res.status(200).json({ message: 'Book Type deleted successfully' });
    }
  } catch (error) {
    console.error('Failed to delete book:', error);
    return res.status(500).json({ error: 'Failed to delete book' });
  }
}

module.exports = { AddBook, Detail, Books, upload, Booklist, Bookdesc, Updatebook, Deletebook, Bookcategory, Bookcategorydesc, Updatebookcategory, Deletebookcategory, Booktypes, Booktypedesc, Addbookcategory, Updatebooktype, Showbookcategory, Showcategoryimage, Showtypeimage, Deletebooktype, Addbooktype, Showbooktype } 
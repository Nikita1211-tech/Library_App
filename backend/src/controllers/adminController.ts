import { Request, Response } from "express";
import { Book } from "../model/bookModel";
import { Sequelize } from "sequelize";
import { Booktype } from "../model/bookTypeModel";
import { Bookcategory } from "../model/bookCategoryModel";
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any ) {
    cb(null, "uploads/");
  },
  filename: function (req: Request, file: any, cb: any) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// const fileSizeLimit = 1024 * 1024 * 10;
// const Upload =  multer({ storage: storage,
//   limits: {
//     fileSize: fileSizeLimit
// }
// });
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
const AddBook = async (req: any, res: Response) => {
  try {
    // console.log(req.files['bookimg'][0].path)
    // console.log(req.files['booktypeimg'][0].path)
    console.log(req.files);
    console.log(req.body);
    if (req.files) {
      const obj = {
        bookName: req.body.bookname,
        book: req.files.path,
        sellingprice: req.body.booksellingprice,
        costprice: req.body.bookcostprice,
        writerName: req.body.bookwriter,
        publishyear: req.body.publishyear,
        booktypename: req.body.booktype,
        bookcat_img: req.body.bookcategoryimg,
        booktype_img: req.body.booktypeimg,
        category: req.body.bookcategories,
        booksummary: req.body.summary,
        img: req.files.path,
      };
      console.log(obj);
      const existingBook = await Book.findOne({
        where: {
          bookName: req.body.bookname,
          writerName: req.body.bookwriter,
          publishyear: req.body.publishyear,
          booktypename: req.body.booktype,
          category: req.body.bookcategories,
        },
      });

      if (existingBook) {
        return res.status(404).json({ error: "Book already exists" });
      }
      const newBook = await Book.create(obj);
      if (newBook) {
        return res.status(200).json({ message: "Book added successfully" });
      }
      res.status(201).json(newBook);
    }
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const Detail = (req: Request, res: Response) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log(`Username: ${username}, Password: ${password}`);
};
const Books = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const Booklist = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll({
      attributes: [
        [Sequelize.fn("MAX", Sequelize.col("id")), "id"],
        "category",
        "bookcat_img",
        "booktypename",
        "booktype_img",
      ],
      group: ["category"],
    });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Bookdesc = async (req: Request, res: Response) => {
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
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const Updatebook = async(req: any ,res: Response) => {
//   console.log('reached')
//   try {
//     console.log(req.body)
//     const bookid = req.params.book_id;
//     console.log(bookid)
//     const obj = {
//       bookName: req.body.bookname,
//       img: req.files.path,
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
//     const book = await Book.findByPk(bookid);
//     if (!book) {
//       return res.status(404).json({ error: 'Book not found' });
//     }
//     book.bookName = req.body.bookname,
//     book.img = req.body.img,
//     book.sellingprice = req.body.booksellingprice,
//     book.costprice = req.body.bookcostprice,
//     book.bookcat_img = req.body.bookcategoryimg,
//     book.writerName = req.body.bookwriter,
//     book.booktype_img = req.body.booktypeimg,
//     book.publishyear = req.body.publishyear,
//     book.booktypename = req.body.booktype,
//     book.category = req.body.bookcategories,
//     book.booksummary = req.body.summary
//     console.log(book)

//     await book.save();
//     res.status(200).json({ message: 'Book updated successfully' });
//   } catch (error) {
//     console.error('Error updating category:', error);
//     res.status(500).json({ error: 'Failed to update Book' });
//   }
// }

const Deletebook = async (req: Request, res: Response) => {
  const bookId = req.params.book_id;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    } else {
      await book.destroy();

      return res.status(200).json({ message: "Book deleted successfully" });
    }
  } catch (error) {
    console.error("Failed to delete book:", error);
    return res.status(500).json({ error: "Failed to delete book" });
  }
};

const BookCategory = async (req: Request, res: Response) => {
  const bookcategory = req.body.bookcategory;

  try {
    const books = await Book.findAll({ where: { category: bookcategory } });
    console.log(books);

    if (books.length > 0) {
      res.json(books);
    } else {
      return res.status(404).json({ Message: "Book category not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to load books" });
  }
};

const Bookcategorydesc = async (req: Request, res: Response) => {
  const bookId = req.params.book_id;
  try {
    const bookcategory = await Bookcategory.findOne({
      where: {
        id: bookId,
      },
    });

    if (bookcategory) {
      res.json(bookcategory);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Booktypedesc = async (req: Request, res: Response) => {
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
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Booktypes = async (req: Request, res: Response) => {
  const booktype = req.body.booktype;

  try {
    const books = await Book.findAll({ where: { booktypename: booktype } });
    console.log(books);

    if (books.length > 0) {
      res.json(books);
    } else {
      return res.status(404).json({ Message: "Book type not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to load books" });
  }
};

const Addbookcategory = async (req: any, res: Response) => {
  try {
    const category = req.body.category;
    if (!category) {
      return res.status(400).json({ message: "Category name not provided" });
    }

    // Check if category already exists
    const existingCategory = await Bookcategory.findOne({
      where: { category: category },
    });
    if (existingCategory) {
      return res.status(409).json({ message: "Book category already exists" });
    }

    // Save the uploaded image
    const imagePath = req.file ? req.file.path : null;
    if (!imagePath) {
      return res.status(400).json({ message: "Image not provided" });
    }

    // Save the category details to the database
    const newCategory = await Bookcategory.create({
      category: category,
      image: imagePath,
    });
    console.log(newCategory);
    return res
      .status(201)
      .json({
        message: "Book category added successfully",
        category: newCategory,
      });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const Showbookcategory = async (req: Request, res: Response) => {
  try {
    const category = await Bookcategory.findAll({
      order: [["createdAt", "DESC"]],
    });
    console.log(category);
    return res.status(201).json(category);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const Showcategoryimage = async (req: Request, res: Response) => {
  try {
    const categoryName = req.params.categoryName;

    const category = await Bookcategory.findOne({
      where: { category: categoryName },
      attributes: ["image"],
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Return the image URL of the category
    return res.status(200).json({ image: category.image });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
const Showtypeimage = async (req: Request, res: Response) => {
  try {
    const typeName = req.params.typeName;

    const type = await Booktype.findOne({
      where: { type: typeName },
      attributes: ["image"],
    });

    if (!type) {
      return res.status(404).json({ error: "Type not found" });
    }

    // Return the image URL of the category
    return res.status(200).json({ image: type.image });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const Updatebookcategory = async (req: any, res: Response) => {
  try {
    console.log(req?.file);
    const categoryid = req.params.id;
    const categoryname = req.body.category;
    const image = req?.file?.path;
    const category = await Bookcategory.findByPk(categoryid);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // If User Exist
    if (categoryname) {
      const existingCategory = await Book.findOne({
        where: { category: categoryname },
      });
      if (existingCategory && existingCategory.id !== categoryid) {
        return res
          .status(400)
          .json({ message: "Category name already exists" });
      }
    }
    category.category = categoryname;
    if (image) {
      category.image = image;
    }
    await category.save();
    console.log(category);
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
};

const Updatebooktype = async (req: any, res: Response) => {
  try {
    console.log(req?.file);
    const typeid = req.params.id;
    const typename = req.body.type;
    const image = req?.file?.path;
    const type = await Booktype.findByPk(typeid);
    if (!type) {
      return res.status(404).json({ message: "Type not found" });
    }

    if (typename && type.type !== typename) {
      const existingType = await Booktype.findOne({
        where: { type: typename },
      });
      if (existingType && existingType.id !== typeid) {
        return res.status(400).json({ message: "Type name already exists" });
      }
      type.type = typename;
      // type.image = image;
    }
    if (image) {
      type.image = image;
    }
    console.log(type);
    await type.save();
    res.status(200).json({ message: "Type updated successfully" });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
};

const Deletebookcategory = async (req: Request, res: Response) => {
  const bookId = req.params.book_id;

  try {
    const category = await Bookcategory.findByPk(bookId);

    if (!category) {
      return res.status(404).json({ error: "Book Category not found" });
    } else {
      await category.destroy();

      return res
        .status(200)
        .json({ message: "Book Category deleted successfully" });
    }
  } catch (error) {
    console.error("Failed to delete book:", error);
    return res.status(500).json({ error: "Failed to delete book" });
  }
};

const Addbooktype = async (req: any, res: Response) => {
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
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const Showbooktype = async (req: Request, res: Response) => {
  try {
    const type = await Booktype.findAll({ order: [["createdAt", "DESC"]] });
    return res.status(201).json(type);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const Deletebooktype = async (req: Request, res: Response) => {
  const bookId = req.params.book_id;

  try {
    const type = await Booktype.findByPk(bookId);

    if (!type) {
      return res.status(404).json({ error: "Book Type not found" });
    } else {
      await type.destroy();
      return res
        .status(200)
        .json({ message: "Book Type deleted successfully" });
    }
  } catch (error) {
    console.error("Failed to delete book:", error);
    return res.status(500).json({ error: "Failed to delete book" });
  }
};

export {
  AddBook,
  Detail,
  Books,
  upload,
  Booklist,
  Bookdesc,
  Deletebook,
  BookCategory,
  Bookcategorydesc,
  Updatebookcategory,
  Deletebookcategory,
  Booktypes,
  Booktypedesc,
  Addbookcategory,
  Updatebooktype,
  Showbookcategory,
  Showcategoryimage,
  Showtypeimage,
  Deletebooktype,
  Addbooktype,
  Showbooktype,
};
